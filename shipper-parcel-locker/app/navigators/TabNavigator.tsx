import Colors from "@/app/constants/Colors";
import { Feather, Octicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import HomeNavigator from "./HomeNavigator";
import OrderHistoryNavigator from "./OrderHistoryNavigator";
import NotificationNavigator from "./NotificationNavigator";
import SettingNavigator from "./SettingNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { SearchOrderHistoryContext } from "../contexts/SearchOrderHistoryContext";

type TabNavigatorParamList = {
  "navigators/HomeNavigator": undefined;
  "navigators/OrderHistoryNavigator": undefined;
  "navigators/NotificationNavigator": undefined;
  "navigators/SettingNavigator": undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigation: React.FC = () => {
  const { isInputFocused } = useContext(SearchOrderHistoryContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon: React.ReactNode;
          color = focused ? Colors.orange_1 : Colors.grey;
          size = 24;
          switch (route.name) {
            case "navigators/HomeNavigator":
              icon = <Octicons name="home" color={color} size={size} />;
              break;
            case "navigators/OrderHistoryNavigator":
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
        name="navigators/OrderHistoryNavigator"
        component={OrderHistoryNavigator}
        options={{ tabBarStyle: { display: isInputFocused ? "none" : "flex" } }}
      />
      <Tab.Screen name="navigators/NotificationNavigator" component={NotificationNavigator} />
      <Tab.Screen
        name="navigators/SettingNavigator"
        component={SettingNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display:
              getFocusedRouteNameFromRoute(route) === "editprofile" || getFocusedRouteNameFromRoute(route) === "statics"
                ? "none"
                : "flex"
          }
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
