import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Setting from "../bottomNavigation/Setting";
import Statistics from "../components/Setting/Statistics";
import EditProfile from "../components/Setting/EditProfile";
import ChangePassword from "../components/Setting/ChangePassword";

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="bottomNavigation/Setting" component={Setting}></Stack.Screen>
        <Stack.Screen name="editprofile" component={EditProfile}></Stack.Screen>
        <Stack.Screen name="changePassword" component={ChangePassword}></Stack.Screen>
        <Stack.Screen name="statics" component={Statistics}></Stack.Screen>
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default ProfileNavigator;
