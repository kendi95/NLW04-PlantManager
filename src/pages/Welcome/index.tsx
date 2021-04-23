import React, { FC } from "react";
import { 
  Text, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  View
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation, StackActions } from '@react-navigation/native';

import wateringIMG from '../../assets/watering.png'; 
import { styles } from "./styles";

export const Welcome: FC = () => {
  const { dispatch } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>
        <Image 
          source={wateringIMG} 
          style={styles.image} 
          resizeMode="contain"
        />
        
        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. 
          Nós cuidamos de lembrar você sempre que precisar
        </Text>

        <TouchableOpacity 
          onPress={() => dispatch(StackActions.replace('UserIdentification'))}
          style={styles.button} 
          activeOpacity={0.6}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />  
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}