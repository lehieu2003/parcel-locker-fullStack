import React, { useState } from "react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import MainNavigator from "./navigators/MainNavigator";
import { SearchOrderHistoryProvider } from "./contexts/SearchOrderHistoryContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthNavigator from "./navigators/AuthNavigator";
import * as SecureStore from "expo-secure-store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf")
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AutoLoginWrapper>
        <SearchOrderHistoryProvider>
          <RootLayoutNav />
        </SearchOrderHistoryProvider>
      </AutoLoginWrapper>
    </AuthProvider>
  );
}

function AutoLoginWrapper({ children }: { children: React.ReactNode }) {
  const { signIn } = useAuth();
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      if (username && password) {
        await signIn(username, password);
      }
      setAutoLoginAttempted(true);
    };

    autoLogin();
  }, []);

  if (!autoLoginAttempted) {
    return null;
  }

  return <>{children}</>;
}

function RootLayoutNav() {
  const { user } = useAuth();

  const isLogin = !!user?.accessToken;

  return <>{isLogin ? <MainNavigator /> : <AuthNavigator />}</>;
}
