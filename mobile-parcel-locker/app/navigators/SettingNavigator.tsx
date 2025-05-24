import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../components/Setting/Setting";
import EditProfile from "../components/Setting/EditProfile";
import ChangePassword from "../components/Setting/ChangePassword";
const SettingNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "left",
          headerTitleStyle: { fontFamily: "mon-sb", fontSize: 18 },
          presentation: "transparentModal",
          animation: "fade"
        }}
      >
        <Stack.Screen name="components/Setting/Setting" component={Setting} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </>
  );
};

export default SettingNavigator;
