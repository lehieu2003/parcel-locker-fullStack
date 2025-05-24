import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../components/Auth/LoginScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";
import RegisterByCode from "../components/Auth/RegisterByCode";
import Onboarding from "../components/Splash/Onboarding";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ConfirmEmail from "../components/Auth/ConfirmEmail";
import OtpVerification from "../components/Auth/OtpVerification";
import ResetPassword from "../components/Auth/ResetPassword";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="components/Splash/Onboarding" component={Onboarding} />
        <Stack.Screen name="components/Auth/LoginScreen" component={LoginScreen} />
        <Stack.Screen name="components/Auth/RegisterByCode" component={RegisterByCode} />
        <Stack.Screen name="components/Auth/SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="components/Auth/ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="components/Auth/ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="components/Auth/OtpVerification" component={OtpVerification} />
        <Stack.Screen name="components/Auth/ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default AuthNavigator;
