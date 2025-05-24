import { defaultStyles } from "@/app/constants/Styles";
import { useAuth } from "@/app/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import InputHookFormComponent from "../ReusableComponents/InputHookFormComponent";

type LoginFormData = {
  username: string;
  password: string;
};

const LoginScreen = ({ navigation }: any) => {
  const { signIn, user, isLoading, setIsLoading } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<LoginFormData>();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [AuthError, setAuthError] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  // Auto login
  useEffect(() => {
    const loadRememberedCredentials = async () => {
      const storedUsername = await SecureStore.getItemAsync("username");
      const storedPassword = await SecureStore.getItemAsync("password");
      if (storedUsername && storedPassword) {
        await signIn(storedUsername, storedPassword);
      }
    };

    loadRememberedCredentials();
  }, []);

  const handleCheckboxClick = () => {
    setRememberPassword(!rememberPassword);
  };

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.username, data.password);
      await SecureStore.setItemAsync("username", data.username);
      rememberPassword && (await SecureStore.setItemAsync("password", data.password));
      setIsLoading(false);

      return user?.accessToken;
    } catch (error) {
      setAuthError(true);
      console.error("Error", JSON.stringify(error));
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 bg-white p-7 justify-center">
          <View className="mb-12 items-center">
            <Text className="font-mon-sb text-2xl font-bold self-center">Welcome back!</Text>
            <Text className="font-mon-sb text-2xl font-bold self-center">Glad to see you again!</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 10,
              marginBottom: 10
            }}
          >
            <InputHookFormComponent
              control={control}
              name="username"
              placeholder="Enter your username"
              rules={{
                required: "Username is required"
              }}
              errorMessage={errors.username?.message?.toString() || ""}
            />

            <View>
              <InputHookFormComponent
                control={control}
                name="password"
                placeholder="Enter your password"
                rules={{
                  required: "Password is required"
                }}
                errorMessage={errors.password?.message?.toString() || ""}
                isSecure={!showPassword}
              />

              {password?.length > 0 && (
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  style={{ position: "absolute", right: 10, top: 10 }}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </View>
          </View>

          <View className="flex flex-row justify-between mb-5">
            <TouchableOpacity className="flex flex-row justify-start" onPress={handleCheckboxClick}>
              <Ionicons name={rememberPassword ? "checkbox" : "square-outline"} size={20} color="#aeb7c2" />
              <Text className="text-[#aeb7c2] font-mon-sb">Remember me?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row justify-end"
              onPress={() => navigation.navigate("components/Auth/ForgotPassword")}
            >
              <Text className="text-[#35c2c1] font-mon-sb font-bold">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {AuthError && <Text className=" pb-6 text-red-500 text-center">Invalid username or password</Text>}
          <ButtonComponent
            text={isLoading ? "Loading..." : "Login"}
            width={300}
            alignSelf="center"
            backgroundColor="#1e232c"
            onPress={handleSubmit(handleLogin)}
            disabled={isLoading}
          />

          <View className="flex-row gap-2.5 items-center my-3">
            <View className="flex-1 border-b border-black" />
            <Text className="font-mon-sb text-[#5E5D5E] text-base font-semibold">Or Login with</Text>
            <View className="flex-1 border-b border-black" />
          </View>

          <View style={{ gap: 10 }}>
            <TouchableOpacity className="bg-white border border-grey-500 h-12 rounded-lg items-center justify-center flex-row px-2.5 shadow-lg">
              <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
              <Text className="text-black text-base font-mon-sb font-medium">Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border border-grey-500 h-12 rounded-lg items-center justify-center flex-row px-2.5 shadow-lg">
              <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
              <Text className="text-black text-base font-mon-sb font-medium">Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border border-grey-500 h-12 rounded-lg items-center justify-center flex-row px-2.5 shadow-lg">
              <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
              <Text className="text-black text-base font-mon-sb font-medium">Continue with Facebook</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-5">
            <Text className="text-[#aeb7c2] font-mon-sb">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("components/Auth/SignUpScreen")}
              style={{ marginLeft: 5 }}
            >
              <Text className="text-[#35c2c1] font-mon-sb font-bold">Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
