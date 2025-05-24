/**
 * @typedef {Object} AuthContextType
 * @property {{ username: string; accessToken: string } | null} user - The authenticated user object or null if not authenticated.
 * @property {Function} setUser - Function to set the user object.
 * @property {Function} signIn - Function to sign in a user.
 * @property {Function} signOut - Function to sign out the current user.
 * @property {Function} signUp - Function to sign up a new user.
 * @property {Function} signUpByCode - Function to sign up a user by confirmation code.
 * @property {boolean} isLoading - Indicates if the authentication state is loading.
 */

/**
 * AuthContext provides authentication state and functions to manage authentication.
 * @type {React.Context<AuthContextType | undefined>}
 */

/**
 * AuthProvider component that provides authentication context to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The AuthProvider component.
 */

/**
 * Custom hook to use the AuthContext.
 * @throws Will throw an error if used outside of an AuthProvider.
 * @returns {AuthContextType} The authentication context value.
 */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API_ENDPOINT } from "../utils/constants";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  user: { username: string; accessToken: string; phoneNumber?: string; role?: string; email?: string } | null;
  setUser: (
    user: { username: string; accessToken: string; phoneNumber?: string; role?: string; email?: string } | null
  ) => void;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  signUpByCode: (email: string, code: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{
    username: string;
    accessToken: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    role?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const username = await SecureStore.getItemAsync("username");

        if (accessToken && username) {
          setUser({ username, accessToken });
        }
      } catch (error: any) {
        console.error("Error", JSON.stringify(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const signIn = async (username: string, password: string) => {
    const tokenAPI_ENDPOINT = API_ENDPOINT + "auth/token";
    const userAPI_ENDPOINT = API_ENDPOINT + "account/me";

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await axios.post(tokenAPI_ENDPOINT, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      });
      const { access_token } = response.data;

      const responseUserInfo = await axios.get(userAPI_ENDPOINT, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`
        }
      });
      const userInfo = responseUserInfo.data;
      setUser({
        username: userInfo.username,
        accessToken: access_token,
        email: userInfo.email,
        phoneNumber: userInfo.phone,
        role: userInfo.role.name
      });

      try {
        await SecureStore.setItemAsync("accessToken", access_token);
      } catch (error) {
        console.error("Failed to store access token:", error);
      }
    } catch (error: any) {
      console.error("Error", JSON.stringify(error.response.data));
      throw new Error("Failed to sign in");
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("username");
    } catch (error: any) {
      console.error("Error", JSON.stringify(error));
      throw new Error("Failed to sign out");
    }
  };

  const signUp = async (username: string, email: string, password: string, confirm_password: string) => {
    const signUpAPI_ENDPOINT = API_ENDPOINT + "account/Register_by_code";
    const data1 = {
      username,
      email,
      password,
      confirm_password
    };

    try {
      const response = await axios.post(signUpAPI_ENDPOINT, data1, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyMjc1NDQxOX0.8IMgA119o_o1RqOVlVAyR_KNI3sBcm49l-QStapGfKw",
          "Content-Type": "application/json"
        }
      });

      console.log("response", response.data.message);
      Alert.alert("Register success", "Verify account now", [
        {
          text: "OK",
          onPress: () => navigation.navigate("components/Auth/RegisterByCode" as never)
        }
      ]);
    } catch (error: any) {
      console.error("Error", JSON.stringify(error.response.data));
      throw new Error("Failed to sign up");
    }
  };

  const signUpByCode = async (email: string, code: string) => {
    const confirmEmailAPI_ENDPOINT = `${API_ENDPOINT}user/confirm_code?code=${code}&email=${email}`;
    const data1 = {
      code,
      email
    };

    try {
      const response = await axios.post(confirmEmailAPI_ENDPOINT, data1, {});
      Alert.alert("Email confirmed", "You can login now", [
        {
          text: "OK",
          onPress: () => navigation.navigate("components/Auth/LoginScreen" as never)
        }
      ]);
      console.log("response", response);
    } catch (error: any) {
      console.error("Error", error.response?.data?.detail || error.message);
      throw new Error("Failed to sign up by code");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, isLoading, setIsLoading, signUp, signUpByCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
