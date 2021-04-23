import React, { FC } from "react";
import { 
  CardStyleInterpolators, 
  createStackNavigator 
} from '@react-navigation/stack';

import colors from "../styles/colors";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import { MyPlants } from "../pages/MyPlants";
import { TabRoutes } from "./tab.routes";

const StackNav = createStackNavigator();

export const StackRouter: FC = () => {
  return (
    <StackNav.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <StackNav.Screen name="Welcome" component={Welcome} />
      <StackNav.Screen 
        name="UserIdentification" 
        component={UserIdentification} 
      />
      <StackNav.Screen name="Confirmation" component={Confirmation} />
      <StackNav.Screen name="PlantSave" component={PlantSave} />
      <StackNav.Screen name="PlantSelect" component={TabRoutes} />
      <StackNav.Screen name="MyPlants" component={TabRoutes} />
    </StackNav.Navigator>
  );
}