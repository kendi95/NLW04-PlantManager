import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View, Animated } from "react-native";
import { 
  RectButton, 
  RectButtonProps, 
  Swipeable 
} from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from "../../styles/colors";
import { IPlant } from "../../types";

import { styles } from "./styles";

interface PlantCardSecundaryProps extends RectButtonProps {
  data: IPlant;
  handleRemove: () => void;
}

export const PlantCardSecundary: FC<PlantCardSecundaryProps> = ({ 
  data, 
  handleRemove,
  ...rest 
}) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton 
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={24} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri 
          width={50}
          height={50}
          uri={data.photo}
        />
        <Text style={styles.text}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
          </Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}