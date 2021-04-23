import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Text, View, ScrollView } from "react-native";
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PlantCardSecundary } from "../../components/PlantCardSecundary";

import { getPlant, removePlant } from "../../services/asyncStorage";
import { IPlant } from "../../types";

import { styles } from "./styles";

export const MyPlants: FC = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextWatered, setNextWatered] = useState<string>('');

  const handleRemovePlant = async (plant: IPlant): Promise<void> => {
    // Criar um modal de alerta.
    await removePlant(String(plant.id));

  }

  useEffect(() => {
    async function getPlants() {
      setLoading(true);
      const plants = await getPlant();

      const nextTime = formatDistance(
        new Date(plants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(
        `Não esqueça de regar a ${plants[0].name} à ${nextTime} horas.`
      )

      setPlants(plants);
      setLoading(false);
    }

    getPlants();
  }, []);

  if (loading) {
    return <Loading src={require('../../assets/load.json')} />
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
    <View style={styles.container}>
      <Header 
        textLight="Minhas" 
        textStrong="Plantinhas"
      />

      <View style={styles.spotlight}>
        <Image 
          source={require('../../assets/waterdrop.png')}
          style={styles.spotlightImg}
        />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantTitle}>Próximas regadas</Text>

        <FlatList 
          data={plants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1
          }}
          renderItem={({ item }) => (
            <PlantCardSecundary 
              data={item} 
              handleRemove={() => handleRemovePlant(item)}
            />
          )}
        />
      </View>
    </View>
    </ScrollView>
  );
}