import axios from "axios";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useMemo, useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { OrderHistoryProvider } from "./contexts/OrderHistoryContext";
import { ParcelProvider } from "./contexts/ParcelContext";
import { SearchHomeProvider } from "./contexts/SearchHomeContext";
import AuthNavigators from "./navigators/AuthNavigators";
import MainNavigator from "./navigators/MainNavigator";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)"
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-sb": require("../assets/fonts/Roboto-Medium.ttf"),
    "roboto-b": require("../assets/fonts/Roboto-Bold.ttf"),
    "roboto-l": require("../assets/fonts/Roboto-Light.ttf"),
    "roboto-t": require("../assets/fonts/Roboto-Thin.ttf")
  });

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
        <NotificationProvider>
          <OrderHistoryProvider>
            <ParcelProvider>
              <SearchHomeProvider>
                <RootLayoutNav />
              </SearchHomeProvider>
            </ParcelProvider>
          </OrderHistoryProvider>
        </NotificationProvider>
      </AutoLoginWrapper>
    </AuthProvider>
  );
}

// AutoLoginWrapper component that attempts to auto-login the user using stored credentials.
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

  useMemo(() => {
    const fetchLockers = async () => {
      try {
        const lockerNumResponse = await axios.get("https://api.captechvn.com/api/v1/lockers?page=1&per_page=11", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const totalLocker = lockerNumResponse.data.total_lockers;

        const response = await axios.get(`https://api.captechvn.com/api/v1/lockers?page=1&per_page=${totalLocker}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const lockers = response.data.data;

        const lockersWithCellCount = lockers.map((locker: any) => ({
          ...locker,
          cells: locker.cells.length
        }));
        SecureStore.setItemAsync("lockers", JSON.stringify(lockersWithCellCount));
      } catch (error) {
        console.error("Error fetching lockers data:", error);
      }
    };
    fetchLockers();
  }, []);

  return <>{isLogin ? <MainNavigator /> : <AuthNavigators />}</>;
}
