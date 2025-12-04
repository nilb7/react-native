// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";

import ListScreen from "./screens/ListScreen"; // 👈 like ListScreen in the example
import StudentDetail from "./components/StudentDetail";
import StudenScreen from "./screens/StudentScreen";
import ProfileScreen from "./screens/ProfileScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Main"
    //     screenOptions={{
    //       title: "App",
    //     }}
    //   >
    //     <Stack.Screen name="Main" component={MainScreen} />

    //     <Stack.Screen name="List" component={ListScreen} />

    //      <Stack.Screen name="nil" component={nilScreen} />
    //   </Stack.Navigator>

    //   <StatusBar style="auto" />
    // </NavigationContainer>
    // <StudenScreen ></StudenScreen>
    <ProfileScreen></ProfileScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
