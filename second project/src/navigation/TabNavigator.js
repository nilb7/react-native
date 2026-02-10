import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator, AboutStackNavigator } from "./StackNavigator";
import IosStackNavigator from "./IosStackNavigator";
import AndroidStackNavigator from "./AndroidStackNavigator";
import LenovoStackNavigator from "./LenovoStackNavigator";
import Ios from "../screens/Ios";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#2c3e50",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
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
        name="iOS"
        component={IosStackNavigator}
        options={{
          tabBarLabel: "Android ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="apple"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Android"
        component={AndroidStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="phone"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Lenovo"
        component={LenovoStackNavigator}
        options={{
          tabBarLabel: "Lenovo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="laptop"
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
