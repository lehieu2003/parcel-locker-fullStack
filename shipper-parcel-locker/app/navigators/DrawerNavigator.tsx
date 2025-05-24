import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigator";
import Menu from "@/app/components/Menu/Menu";
import LoginScreen from "@/app/components/Auth/LoginScreen";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator(); // menu
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left"
      }}
      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Screen name="navigators/TabNavigator" component={TabNavigation}></Drawer.Screen>
      <Drawer.Screen name="components/Auth/LoginScreen" component={LoginScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
