import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./TabNavigator";
import Single from "../screens/Single";

const Stack = createStackNavigator();



const MainStackNavigator = () => {
  return (
    <Stack.Navigator>


      <Stack.Screen 
      name="Home" 
      component={BottomTabNavigator}
      options={{ headerShown: false }}
      />

      
      <Stack.Screen 
      name="Single" 
      component={Single}
      options={{ title: 'Details' }}
      />
      

    </Stack.Navigator>
  );
};



export default MainStackNavigator;
