import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "../bottomNavigator/Home";
import LiveTrackingDetails from "../components/LiveTracking/[id]";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TrackingMap from "../components/Map/TrackingMap";
import FindLocker from "../components/FindLocker/FindLocker";
import ScanQR from "../components/ScanQR/ScanQR";
const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          )
        }}
      >
        <Stack.Screen name="bottomNavigator/Home" component={Home} />
        <Stack.Screen name="components/LiveTracking/[id]" component={LiveTrackingDetails} />
        <Stack.Screen name="components/OrderHistory/OrderHistory" component={OrderHistory} />
        <Stack.Screen name="components/ScanQR/ScanQR" component={ScanQR} />
        <Stack.Screen name="components/Map/TrackingMap" component={TrackingMap} />
        <Stack.Screen name="components/FindLocker/FindLocker" component={FindLocker} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeNavigator;
