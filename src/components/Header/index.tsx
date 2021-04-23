import React, { FC } from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";

interface HeaderProps {
  textLight: string;
  textStrong: string;
}

export const Header: FC<HeaderProps> = ({ textLight, textStrong }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{textLight}</Text>
        <Text style={styles.username}>{textStrong}</Text>
      </View>

      <Image 
        style={styles.image} 
        source={{ 
          uri: "https://avatars.githubusercontent.com/u/36816259?v=4" 
        }} 
      />
    </View>
  );
}