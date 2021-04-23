import React, { FC } from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from "./styles";

interface EnviromentButtonProps extends RectButtonProps {
  textButton: string;
  active?: boolean;
}

export const EnviromentButton: 
  FC<EnviromentButtonProps> = ({ textButton, active = false, ...rest }) => {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]} 
      {...rest}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive
        ]}
      >
        {textButton}
      </Text>
    </RectButton>
  );
}