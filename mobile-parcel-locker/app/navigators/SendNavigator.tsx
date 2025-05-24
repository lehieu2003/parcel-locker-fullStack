import InPostHome from "@/app/components/Send/InpostHome";
import InPostLocker from "@/app/components/Send/InpostLocker";
import InPostSender from "@/app/components/Send/InpostSender";
import PeopleDetail from "@/app/components/Send/PeopleDetail";
import Sending from "@/app/components/Send/Sending";
import Summary from "@/app/components/Send/Summary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const SendNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Send/SendScreen" component={Sending} />
        <Stack.Screen name="Send/InPostLocker" component={InPostLocker} />
        <Stack.Screen name="Send/InPostSender" component={InPostSender} />
        <Stack.Screen name="Send/InPostHome" component={InPostHome} />
        <Stack.Screen name="Send/PeopleDetail" component={PeopleDetail} />
        <Stack.Screen name="Send/Summary" component={Summary} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default SendNavigator;
