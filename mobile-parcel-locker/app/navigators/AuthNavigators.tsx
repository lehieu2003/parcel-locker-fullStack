import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../components/Auth/LoginScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import OtpVerification from "../components/Auth/OtpVerification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ConfirmEmail from "../components/Auth/ConfirmEmail";
import RegisterByCode from "../components/Auth/RegisterByCode";
import SplashScreen from "../components/Splash/Splash";
import Onboarding from "../components/Splash/Onboarding";
import OnboardingScreen from "../components/Splash/OnboardingScreen";
const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="components/Splash/Splash" component={SplashScreen} />
        <Stack.Screen name="components/Splash/Onboarding" component={Onboarding} />
        <Stack.Screen name="components/Splash/OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="components/Auth/LoginScreen" component={LoginScreen} />
        <Stack.Screen name="components/Auth/SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="components/Auth/ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen name="components/Auth/RegisterByCode" component={RegisterByCode} />
        <Stack.Screen name="components/Auth/ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="components/Auth/ResetPassword" component={ResetPassword} />
        <Stack.Screen name="components/Auth/OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default AuthNavigator;
