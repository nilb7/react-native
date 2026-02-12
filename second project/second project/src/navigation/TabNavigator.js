import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator, AboutStackNavigator } from "./StackNavigator";
import IosStackNavigator from "./IosStackNavigator";
import AndroidStackNavigator from "./AndroidStackNavigaror";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00BCD4",
        tabBarInactiveTintColor: "lightgray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#2C3E50",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Ios"
        component={IosStackNavigator}
        options={{
          tabBarLabel: "iOS",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cellphone-iphone"
              size={26}
              color={color}
            />
          ),
        }}
      />

       <Tab.Screen
        name="Android"
        component={AndroidStackNavigator}
        options={{
          tabBarLabel: "Androic",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="phone"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="video-stabilization"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
