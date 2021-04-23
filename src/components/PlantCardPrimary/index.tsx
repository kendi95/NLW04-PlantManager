import React, { FC } from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import { styles } from "./styles";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export const PlantCardPrimary: FC<PlantCardPrimaryProps> = ({ data, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri 
        width={100}
        height={100}
        uri={data.photo}
      />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}