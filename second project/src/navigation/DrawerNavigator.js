
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';

import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";

// Create Drawer Navigator instance
const Drawer = createDrawerNavigator();

/**
 * Main Drawer Navigator for the app
 * Contains Home (with tabs) and About (with stack)
 */
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: '#1976d2',
                drawerInactiveTintColor: '#1565c0',
                drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                drawerStyle: {
                    backgroundColor: '#e3f2fd',
                    width: 270,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="About"
                component={AboutStackNavigator}
                options={{
                    title: 'About',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="information-circle-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
