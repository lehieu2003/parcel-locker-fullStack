import { defaultStyles } from "@/app/constants/Styles";
import { useAuth } from "@/app/contexts/AuthContext";
import { API_ENDPOINT } from "@/app/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterByCode = ({ navigation }: any) => {
  const { signUpByCode } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleConfirmEmail = async () => {
    await signUpByCode(email, code);
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
      <View className="flex flex-col gap-5 my-6">
        <Text className="text-2xl font-bold">Verify account </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Paste your email"
          style={defaultStyles.inputField}
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your code sent to your email"
          style={defaultStyles.inputField}
          onChange={(e) => {
            setCode(e.nativeEvent.text);
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-[#1e232c] h-12 rounded-xl justify-center items-center mt-7"
        onPress={() => handleConfirmEmail()}
      >
        <Text style={defaultStyles.btnText}>Confirm email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterByCode;
