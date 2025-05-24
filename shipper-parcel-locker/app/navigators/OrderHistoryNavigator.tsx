import OrderHistory from "@/app/components/OrderHistory/OrderHistory";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const OrderHistoryNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistory} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default OrderHistoryNavigator;
