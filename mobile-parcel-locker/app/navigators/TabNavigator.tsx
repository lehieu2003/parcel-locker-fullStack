import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Octicons, Feather, AntDesign } from "@expo/vector-icons";
import Colors from "@/app/constants/Colors";
import HomeNavigator from "./HomeNavigator";
import SendNavigator from "./SendNavigator";
import NotificationNavigator from "./NotificationNavigator";
import SettingNavigator from "./SettingNavigator";
import OrderHistory from "@/app/components/OrderHistory/OrderHistory";
import TrackingMap from "@/app/components/Map/TrackingMap";
import { SearchHomeContext } from "../contexts/SearchHomeContext";
import ScanQR from "@/app/components/ScanQR/ScanQR";

type TabNavigatorParamList = {
  "navigators/HomeNavigator": undefined;
  "navigators/OrderHistory": undefined;
  "navigators/SendNavigator": undefined;
  "navigators/NotificationNavigator": undefined;
  "navigators/SettingNavigator": undefined;
  "components/ScanQR/ScanQR": undefined;
  "components/Map/TrackingMap": undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigation: React.FC = () => {
  const { isInputFocused } = useContext(SearchHomeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon: React.ReactNode;
          color = focused ? Colors.orange_1 : Colors.grey;
          size = 24;

          if (route.name === "navigators/SendNavigator") {
            return (
              <View className="bg-white p-1.5 rounded-full">
                <View style={styles.plusIconContainer}>
                  <Feather name="plus" size={30} color={Colors.white} />
                </View>
              </View>
            );
          }

          switch (route.name) {
            case "navigators/HomeNavigator":
              icon = <Octicons name="home" color={color} size={size} />;
              break;
            case "navigators/OrderHistory":
              icon = <AntDesign name="calendar" size={size} color={color} />;
              break;
            case "navigators/NotificationNavigator":
              icon = <Feather name="bell" color={color} size={size} />;
              break;
            case "navigators/SettingNavigator":
              icon = <Feather name="settings" color={color} size={size} />;
              break;
          }
          return icon;
        },
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.orange_3,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 100
        },
        unmountOnBlur: true
      })}
      initialRouteName="navigators/HomeNavigator"
    >
      <Tab.Screen
        name="navigators/HomeNavigator"
        component={HomeNavigator}
        options={{ tabBarStyle: { display: isInputFocused ? "none" : "flex" } }}
      />
      <Tab.Screen
        name="navigators/OrderHistory"
        component={OrderHistory}
        options={{ tabBarStyle: { display: isInputFocused ? "none" : "flex" } }}
      />
      <Tab.Screen
        name="navigators/SendNavigator"
        options={{ tabBarStyle: { display: "none" } }}
        component={SendNavigator}
      />
      <Tab.Screen
        name="components/ScanQR/ScanQR"
        component={ScanQR}
        options={{
          tabBarButton: () => null
        }}
      />

      <Tab.Screen name="navigators/NotificationNavigator" component={NotificationNavigator} />
      <Tab.Screen name="navigators/SettingNavigator" component={SettingNavigator} />
      <Tab.Screen
        name="components/Map/TrackingMap"
        component={TrackingMap}
        options={{
          tabBarButton: () => null
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  plusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.orange_1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  }
});

export default TabNavigation;
