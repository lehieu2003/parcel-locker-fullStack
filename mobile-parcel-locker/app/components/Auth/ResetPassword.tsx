import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/app/constants/Styles";

const ResetPassword = ({ navigation }: any) => {
  return (
    <View className="flex-1 bg-white p-6 pt-20">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-outline"
          size={28}
          className="border w-7 h-7 rounded-lg border-[#ABABAB] self-start"
        />
      </TouchableOpacity>

      <View className="flex flex-col gap-5 my-6 p-2">
        <Text className="text-2xl font-bold">Create new password </Text>
        <Text className="text-sm text-[#8391A1]">Your new password must be unique from those previously used.</Text>
      </View>

      <View className="flex flex-col gap-3">
        <TextInput autoCapitalize="none" placeholder="New Password" style={defaultStyles.inputField} />

        <TextInput autoCapitalize="none" placeholder="Confirm Password" style={defaultStyles.inputField} />
      </View>

      <TouchableOpacity
        className="bg-[#1e232c] h-12 rounded-xl justify-center items-center mt-7"
        onPress={() => navigation.navigate("components/Auth/LoginScreen")}
      >
        <Text style={defaultStyles.btnText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;
