import React, { FC } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useNavigation, StackActions, useRoute } from "@react-navigation/core";

import { Button } from "../../components/Button";

import { styles } from "./styles";

interface ConfirmationProps {
  title: string;
  subTitle: string;
  buttonTitle: string;
  emoji: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😊',
  hug: '🤗'
}

export const Confirmation: FC = () => {
  const { dispatch } = useNavigation();
  const {
    emoji,
    buttonTitle,
    nextScreen,
    subTitle,
    title
  } = useRoute().params as ConfirmationProps;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[emoji]}</Text>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>
          {subTitle}
        </Text>

        <View style={styles.footer}>
          <Button label={buttonTitle} onPress={
            () => dispatch(StackActions.replace(nextScreen))} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}