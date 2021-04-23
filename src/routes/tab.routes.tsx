import React, { FC } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyPlants } from "../pages/MyPlants";
import { PlantSelect } from "../pages/PlantSelect";

import colors from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

const TabNav = createBottomTabNavigator();

export const TabRoutes: FC = () => {
  return (
    <TabNav.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        // tabStyle: {
        //   height: 
        // },
        style: {
          // paddingVertical: 10,
          height: 56
        },
      }}
    >
      <TabNav.Screen 
        name="PlantSelect" 
        component={PlantSelect} 
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name="add-circle-outline" 
              size={size} 
              color={color} 
            />
          ))
        }}
      />
      <TabNav.Screen 
        name="MyPlants" 
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name="format-list-bulleted" 
              size={size} 
              color={color} 
            />
          ))
        }} 
      />
    </TabNav.Navigator>
  );
}