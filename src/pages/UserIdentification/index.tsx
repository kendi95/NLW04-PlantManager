import React, { FC, useState } from "react";
import { 
  SafeAreaView, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import colors from "../../styles/colors";
import { Button } from "../../components/Button";
import { save } from "../../services/asyncStorage";

export const UserIdentification: FC = () => {
  const { navigate } = useNavigation();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleBur = 
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      setIsFilled(name !== '' ? true : false);
    }

  const handleFocus = 
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
    }

  const handleInputChange = (value: string) => {
    setName(value);
    setIsFilled(value !== '' ? true : false);
  }

  const handleNavigate = async () => {
    if (name === '') return;

    await save(name);

    navigate('Confirmation', {
      emoji: "smile",
      title: "Prontinho",
      subTitle: "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
      buttonTitle: "Começar",
      nextScreen: "PlantSelect"
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? '😄' : '😀'}</Text>

                <Text style={styles.text}>Como podemos {'\n'} chamar você?</Text>
              </View>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && {
                    borderColor: colors.green
                  }
                ]} 
                value={name}
                placeholder="Digite um nome"
                placeholderTextColor={colors.heading}
                onBlur={handleBur}
                onFocus={handleFocus}
                onChangeText={handleInputChange}
                onEndEditing={handleNavigate}
              />

              <View style={styles.footer}>
                <Button 
                  label="Confirmar" 
                  disabled={name !== '' ? false : true} 
                  onPress={handleNavigate}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}