import React, { FC, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { isBefore, format } from 'date-fns';
import DateTimePicker, { AndroidEvent, Event } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";

import { Button } from "../../components/Button";

import { styles } from "./styles";
import { IPlant } from "../../types";
import { savePlant } from "../../services/asyncStorage";

interface Plant {
  plant: IPlant
}

export const PlantSave: FC = () => {
  const { navigate } = useNavigation();

  const [dateSelected, setDateSelected] = useState(new Date());
  const [visiblePicker, setVisiblePicker] = useState(Platform.OS === 'ios');
  const [dateString, setDateString] = useState<string>('Selecione uma data...');

  const { plant } = useRoute().params as Plant;

  const handleSelectedDate = 
    (event: AndroidEvent | Event, dateTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      setVisiblePicker(oldVisible => !oldVisible);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setDateSelected(new Date());
      return; //Criar um modal de alerta
    }

    setDateSelected(dateTime || new Date());
    setDateString(format(dateTime || new Date(), 'HH:mm'));
  }

  const handleSavePlant = async () => {
    await savePlant({
      ...plant,
      dateTimeNotification: dateSelected
    });

    navigate('Confirmation', {
      emoji: "hug",
      title: "Tudo certo",
      subTitle: "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
      buttonTitle: "Muito obrigado",
      nextScreen: "MyPlants"
    });
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={120}
            width={120} 
          />

          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={require('../../assets/waterdrop.png')}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => setVisiblePicker(true)}
          >
            <Text style={styles.inputDateTimePicker}>{dateString}</Text>
          </TouchableOpacity>

          {visiblePicker && (
            <DateTimePicker 
              value={dateSelected}
              mode="time"
              display="clock"
              onChange={handleSelectedDate}
            />
          )}

          <Button label="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  );
}