import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Text, View, ScrollView } from "react-native";
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { AlertModal } from "../../components/AlertModal";
import { PlantCardSecundary } from "../../components/PlantCardSecundary";

import { getPlant, removePlant } from "../../services/asyncStorage";
import { IPlant } from "../../types";

import { styles } from "./styles";

export const MyPlants: FC = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextWatered, setNextWatered] = useState<string>('');

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [removeTitle, setRemoveTitle] = useState<string>('');
  const [removeText, setRemoveText] = useState<string>('');
  const [targetPlant, setTargetPlant] = useState<string>('');

  const removeMessage = (
    title: string, 
    text?: string,
  ) => {
    setRemoveTitle(title);
    setRemoveText(text || '');
    setIsVisible(true);
  }

  const handleQuestionRemovePlant = async (plant: IPlant): Promise<void> => {
    setTargetPlant(String(plant.id));
    removeMessage(
      "Aviso 😢",
      "Deseja realmente deletar essa planta cadastrado?"
    );
  }

  const handleRemovePlant = async () => {
    await removePlant(targetPlant);
  }

  useEffect(() => {
    async function getPlants() {
      setLoading(true);
      const plants = await getPlant();

      if (plants.length > 0) {
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
      setLoading(false);
    }

    getPlants();
  }, []);

  if (loading) {
    return <Loading src={require('../../assets/load.json')} />
  }

  return (
    <>
      <AlertModal 
        isVisible={isVisible}
        headerTitle={removeTitle}
        contentText={removeText}
        onDismiss={() => setIsVisible(false)}
        cancelText="Cancelar"
        onCancel={() => setIsVisible(false)}
        okText="Sim"
        onOk={handleRemovePlant}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
        }}
        contentContainerStyle={{
          // flex: 1
        }}
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

          {plants.map(plant => (
            <PlantCardSecundary 
              key={plant.id}
              data={plant} 
              handleRemove={() => handleQuestionRemovePlant(plant)}
            />
          ))}

          {/* <FlatList 
            data={plants}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1
            }}
            renderItem={({ item }) => (
              <PlantCardSecundary 
                data={item} 
                handleRemove={() => handleQuestionRemovePlant(item)}
              />
            )}
          /> */}
        </View>
      </View>
      </ScrollView>
    </>
  );
}