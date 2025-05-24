import { defaultStyles } from "@/app/constants/Styles";
import { useAuth } from "@/app/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import InputHookFormComponent from "../ReusableComponents/InputHookFormComponent";
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfimPassword] = useState(false);

  const handleRegister = async (data: FormValues) => {
    await signUp(data.username, data.email, data.password, data.confirmPassword);
    navigation.navigate("components/Auth/RegisterByCode");
  };
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <SafeAreaView className="flex-1 bg-white p-6 pt-16">
      <View className="mb-8 items-center">
        <Text className="font-mon-sb text-2xl font-bold self-center">Welcome!</Text>
        <Text className="font-mon-sb text-2xl font-bold self-center">Register to get started</Text>
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

        <InputHookFormComponent
          control={control}
          name="email"
          placeholder="Enter your email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "email includes @ and domain name"
            }
          }}
          errorMessage={errors.email?.message?.toString() || ""}
        />

        <View>
          <InputHookFormComponent
            control={control}
            name="password"
            placeholder="Enter your password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must have at least 6 characters" }
            }}
            errorMessage={errors.password?.message?.toString() || ""}
            isSecure={!showPassword}
          />
          {password?.length > 0 && (
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>

        <View>
          <InputHookFormComponent
            control={control}
            name="confirmPassword"
            placeholder="Confirm password"
            rules={{
              required: "Confirm Password is required",
              validate: (value: string) => value === control._formValues.password || "Passwords do not match"
            }}
            errorMessage={errors.confirmPassword?.message?.toString() || ""}
            isSecure={!showConfirmPassword}
          />
          {confirmPassword?.length > 0 && (
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => setShowConfimPassword(!showConfirmPassword)}
            />
          )}
        </View>
      </View>

      <ButtonComponent
        text="Register"
        width={310}
        alignSelf="center"
        backgroundColor="#1e232c"
        onPress={handleSubmit(handleRegister)}
      />

      <View className="flex-row gap-2.5 items-center my-2">
        <View className="flex-1 border-b border-black" />
        <Text className="font-mon-sb text-[#5E5D5E] text-base font-semibold">Or Register with</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20
        }}
      >
        <Text className="text-[#aeb7c2] font-mon-sb">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("components/Auth/LoginScreen")} style={{ marginLeft: 5 }}>
          <Text className="text-[#35c2c1] font-mon-sb font-bold">Login Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
