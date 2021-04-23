import React, { FC, useCallback, useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { getByName } from "../../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { EnviromentButton } from "../../components/EnviromentButton";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";
import { Loading } from "../../components/Loading";

import { styles } from "./styles";
import { api } from "../../services/api";

import loadSVG from '../../assets/load.json';
import loadingSVG from '../../assets/loading.json';
import { IPlant } from "../../types";

interface Enviroment {
  key: string;
  title: string;
}

interface Plant extends IPlant {}

export const PlantSelect: FC = () => {
  const { navigate } = useNavigation();

  const [name, setName] = useState<string>('');
  const [enviroments, setEnviroments] = useState<Enviroment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  

  const [page, setPage] = useState<number>(1);

  const handleGetPlantsEnvironments = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get('/plants_environments', {
      params: {
        _sort: 'title',
        _order: 'asc'
      }
    });
    setEnviroments([
      {
        key: 'all',
        title: "Todos"
      },
      ...data
    ]);
  }, []);

  const handleGetPlants = async (): Promise<void> => {
    const { data } = await api.get('/plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 4
      }
    });

    if (page > 1) {
      setPlants(oldPlats => [...oldPlats, ...data]);
      setFilteredPlants(oldPlats => [...oldPlats, ...data]);
      setLoading(false);
      return;
    }

    setPlants(data);
    setFilteredPlants(data);
    setLoading(false);
  }

  const handleFetchMore = async (distance: number): Promise<void> => {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldPage => oldPage + 1);
    await handleGetPlants();
    setLoadingMore(false);
  }

  const handleSelectEnviroment = (env: string): void => {
    setEnviromentSelected(env);

    setFilteredPlants(() => {
      if (env === 'all') {
        return plants;
      }

      return plants
        .filter(plant => plant.environments.includes(env));
    });
  }

  const handlePlantSelect = (plant: Plant): void => {
    navigate('PlantSave', {
      plant
    });
  }

  useEffect(() => {
    async function getName() {
      const { name } = await getByName();
      setName(String(name));
    }
    getName();
  }, []);

  useEffect(() => {
    handleGetPlantsEnvironments();
    handleGetPlants();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header textLight="Olá," textStrong={name} />
      </View>

      <View style={styles.content}>
        <Text style={styles.titleStrong}>Em qual ambiente</Text>
        <Text style={styles.titleLight}>você quer colocar sua planta?</Text>
      </View>

      {loading ? (
        <Loading src={loadSVG} />
      ) : (
        <>
          <FlatList 
            data={enviroments} 
            style={styles.enviromentItems}
            keyExtractor={(item) => String(item.key)}
            contentContainerStyle={{
              paddingHorizontal: 30,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <EnviromentButton 
                key={item.key} 
                textButton={item.title}
                active={enviromentSelected === item.key}
                onPress={() => handleSelectEnviroment(item.key)}
              />
            )} 
          />

          <FlatList 
            data={filteredPlants} 
            style={styles.plants}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{
              paddingHorizontal: 20
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            refreshing={loadingMore}
            onEndReachedThreshold={0.1}
            onEndReached={
              ({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMore ? <Loading src={loadingSVG} /> : <></>
            }
            renderItem={({ item, index }) => (
              <PlantCardPrimary 
                key={index} 
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )} 
          />
        </>
      )}
    </SafeAreaView>
  );
}