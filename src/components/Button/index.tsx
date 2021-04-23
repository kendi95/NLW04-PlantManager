import React, { FC } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "../../styles/colors";

import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
}

export const Button: FC<ButtonProps> = ({ label, disabled, ...rest }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.green_light : colors.green
        }
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.textButton}>{label}</Text>
    </TouchableOpacity>
  );
}