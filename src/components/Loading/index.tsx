import React, { FC } from "react";
import Lottie from 'lottie-react-native';
import { View } from "react-native";

import { styles } from "./styles";

interface AnimationObject {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

interface LoadingProps {
  src: string | { uri: string } | AnimationObject;
}

export const Loading: FC<LoadingProps> = ({ src }) => {
  return (
    <View style={styles.container}>
      <Lottie 
        source={src} 
        autoPlay 
        loop 
        style={styles.animation}
      />
    </View>
  );
}