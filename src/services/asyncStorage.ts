import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from 'date-fns';
import { 
  scheduleNotificationAsync,
  cancelScheduledNotificationAsync, 
  AndroidNotificationPriority 
} from 'expo-notifications';

import { IPlant, IStoragePlant } from '../types';

export const save = async (name: string): Promise<void> => {
  await AsyncStorage
    .setItem("@plant_manager/name", JSON.stringify({ name }) );
}

export const savePlant = async (plant: IPlant): Promise<void> => {
  const nextTime = new Date(plant.dateTimeNotification);
  const now = new Date();

  const { repeat_every, times } = plant.frequency;

  if (repeat_every === 'week') {
    const interval = Math.trunc(7 / times);
    nextTime.setTime(now.getTime() + interval);
  }

  if (repeat_every === 'day') {
    nextTime.setTime(nextTime.getTime() + 1);
  }
  
  const seconds = Math.abs(
    Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
  );

    
  const notificationId = await scheduleNotificationAsync({
    content: {
      title: "Heeeyy,  🌱",
      body: `Está na hora de cuidar da sua ${plant.name}`,
      sound: true,
      vibrate: [300, 150, 300, 150],
      priority: AndroidNotificationPriority.HIGH,
      data: { plant }
    },
    trigger: {
      seconds: seconds < 60 ? 60 : seconds,
      repeats: true
    }
  });

  const data = await AsyncStorage.getItem('@plant_manager/plants');
  const oldPlants = data ? (JSON.parse(data) as IStoragePlant) : {};

  const newPlant = {
    [plant.id]: {
      data: plant,
      notificationId
    }
  }

  await AsyncStorage
    .setItem('@plant_manager/plants', JSON.stringify({
      ...newPlant,
      ...oldPlants
    }));

}

export const getByName = async (): Promise<{name: string | null}> => {
  const value = await AsyncStorage.getItem('@plant_manager/name');

  if (!value) {
    return { name: null };
  }

  return JSON.parse(value);
}

export const getPlant = async (): Promise<IPlant[]> => {
  const data = await AsyncStorage.getItem('@plant_manager/plants');
  const plants = data ? (JSON.parse(data) as IStoragePlant) : {};

  const plantSorted = Object
    .keys(plants)
    .map(plant => {
      return {
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification), 
          'HH:mm'
        )
      }
    })
    .sort((a, b) => 
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
        Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
      )
    );

  return plantSorted;
}

export const removePlant = async (id: string): Promise<void> => {
  const data = await AsyncStorage.getItem('@plant_manager/plants');
  const plants = data ? (JSON.parse(data) as IStoragePlant) : {};

  await cancelScheduledNotificationAsync(plants[id].notificationId);

  delete plants[id];

  await 
    AsyncStorage
    .setItem('@plant_manager/plants', JSON.stringify(plants));

}