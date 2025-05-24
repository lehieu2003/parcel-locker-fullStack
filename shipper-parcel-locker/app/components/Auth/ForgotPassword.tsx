import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/app/constants/Styles";
import { Validate } from "@/app/utils/Validate";

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  return (
    <View className="flex-1 bg-white p-6 pt-20">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-outline"
          size={28}
          className="border w-7 h-7 rounded-lg border-[#ABABAB] self-start"
        />
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginVertical: 30,
          gap: 5,
          padding: 10
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold"
          }}
        >
          Forgot Password?
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#8391A1"
          }}
        >
          Don't worry! It occurs. Please enter the email address linked with your account.{" "}
        </Text>
      </View>

      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your email"
          style={defaultStyles.inputField}
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
          onBlur={handleCheckEmail}
        />
      </View>

      <TouchableOpacity
        className="bg-[#1e232c] h-12 rounded-xl justify-center items-center mt-7"
        // disabled={isDisable}
        onPress={() => {
          navigation.navigate("components/Auth/OtpVerification", { email });
        }}
      >
        <Text style={defaultStyles.btnText}>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
