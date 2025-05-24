import { defaultStyles } from "@/app/constants/Styles";
import { API_ENDPOINT } from "@/app/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConfirmEmail = ({ navigation }: any) => {
  const [token, setToken] = useState("");

  const handleConfirmEmail = async () => {
    const confirmEmail_API_ENDPOINT = API_ENDPOINT + "/api/v1/user/confirm?token=" + token;

    try {
      const response = await axios.post(confirmEmail_API_ENDPOINT, token, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyMjc1NDQxOX0.8IMgA119o_o1RqOVlVAyR_KNI3sBcm49l-QStapGfKw"
        }
      });
      Alert.alert("Email confirmed", "You can login now", [
        {
          text: "OK",
          onPress: () => navigation.navigate("components/Auth/LoginScreen")
        }
      ]);
      console.log("response", response);
    } catch (error: any) {
      console.error("Error", error.response?.data?.detail || error.message);
    }
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
          placeholder="Paste verification link from email"
          style={defaultStyles.inputField}
          onChange={(e) => {
            setToken(e.nativeEvent.text);
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

export default ConfirmEmail;
