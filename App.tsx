import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { 
  useFonts, 
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { 
  addNotificationReceivedListener,
} from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';

import { Routes } from './src/routes';
import { IPlant } from './src/types';
import colors from './src/styles/colors';

export default function App() {
  useEffect(() => {
    const onNotificationAsync = async () => {
      // await cancelAllScheduledNotificationsAsync();
      const subscriptions = 
        addNotificationReceivedListener(async(notification) => {
          const plant = notification.request.content.data.plant as IPlant;
          console.log(plant);
        });
      return () => subscriptions.remove();

    }

    onNotificationAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar translucent backgroundColor={colors.white} animated />
      <Routes />
    </>
  );
}

