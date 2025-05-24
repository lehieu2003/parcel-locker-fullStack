import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScanQR from "../components/Camera/ScanQR";
import MapView from "../components/Map/MapView";
import Home from "../bottomNavigation/Home";
const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="bottomNavigation/Home" component={Home} />
        <Stack.Screen name="MapView" component={MapView} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeNavigator;
