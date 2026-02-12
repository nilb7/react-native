import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Android from '../screens/Android';

const Stack = createStackNavigator();

const AndroidStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Android" 
        component={Android} 
      />
    </Stack.Navigator>
  );
};

export default AndroidStackNavigator;
