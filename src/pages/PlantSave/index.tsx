import React, { FC, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Platform, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { isBefore, format } from 'date-fns';
import 
DateTimePicker, 
  { 
    AndroidEvent, 
    Event, 
    WindowsDatePickerChangeEvent 
  } 
from '@react-native-community/datetimepicker';
import { Feather } from "@expo/vector-icons";

import { Button } from "../../components/Button";
import { AlertModal } from "../../components/AlertModal";

import { styles } from "./styles";
import { IPlant } from "../../types";
import { savePlant } from "../../services/asyncStorage";
import colors from "../../styles/colors";

interface Plant {
  plant: IPlant
}

export const PlantSave: FC = () => {
  const { navigate, goBack } = useNavigation();

  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [visiblePicker, setVisiblePicker] = useState(Platform.OS === 'ios');
  const [dateString, setDateString] = useState<string>('Selecione uma data...');

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');

  const { plant } = useRoute().params as Plant;

  const errorMessage = (title: string, text?: string) => {
    setErrorTitle(title);
    setErrMessage(text || '');
    setIsVisible(true);
  }

  const handleSelectedDate = 
    (event: AndroidEvent | WindowsDatePickerChangeEvent | Event, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setVisiblePicker(oldVisible => !oldVisible);
    }

    if (!date) {
      return;
    }

    if (isBefore(date, new Date())) {
      errorMessage(
        "Alerta 😣",
        "Não é possível escolher um horário que já passou."
      );
      return;
    }

    setDateSelected(date);
    setDateString(format(date || new Date(), 'HH:mm'));
  }

  const handleSavePlant = async () => {
    try {
      if (!dateSelected) {
        errorMessage(
          "Aviso 😐",
          "Não é possível cadastrar uma planta sem um horário definido."
        );
        return;
      }

      const newPlant = {
        ...plant,
        dateTimeNotification: dateSelected
      }

      await savePlant(newPlant);
  
      navigate('Confirmation', {
        emoji: "hug",
        title: "Tudo certo",
        subTitle: "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito obrigado",
        nextScreen: "MyPlants"
      });
    } catch {
      errorMessage(
        "Alerta 😞",
        "Erro ao cadastrar uma planta, tente novamente."
      );
    }
  }

  return (
    <>
      <AlertModal 
        isVisible={isVisible}
        headerTitle={errorTitle}
        contentText={errMessage}
        onDismiss={() => setIsVisible(false)}
        cancelText="Fechar"
        onCancel={() => setIsVisible(false)}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={goBack}
            >
              <Feather 
                name="chevron-left" 
                size={32} 
                color={colors.green_dark} 
              />
            </TouchableOpacity>
          </View>
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
    </>
  );
}