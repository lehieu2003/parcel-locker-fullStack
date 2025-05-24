import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { useAuth } from "@/app/contexts/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { UserImage } from "@/assets/images/Icon/index";

const Menu = ({ navigation }: any) => {
  const { signOut, user } = useAuth();
  const [notification, setNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 bg-white p-4 rounded-tr-[50px] rounded-br-[50px]">
      <View className="flex-row items-center mb-5 gap-2 mt-5">
        <UserImage className="w-10 h-10 self-end" />

        <View>
          <Text className="font-bold text-lg text-[#F57C00]">{user?.username}</Text>
          <Text className="text-sm text-gray-500">{user?.phoneNumber}</Text>
        </View>
      </View>

      <Text className="font-bold text-gray-400 mb-2 text-sm">Account</Text>
      <View className="mb-6">
        <TouchableWithoutFeedback
          className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100"
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text className="font-medium text-base">Edit Profile</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Change Password</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Add a payment method</Text>
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Push Notification</Text>
          <Switch value={notification} onValueChange={(value) => setNotification(value)} />
        </View>

        <View className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Dark Mode</Text>
          <Switch value={darkMode} onValueChange={(value) => setDarkMode(value)} />
        </View>
      </View>

      <Text className="font-bold text-gray-400 mb-2 text-sm">Support & About</Text>
      <View className="mb-6">
        <TouchableWithoutFeedback className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Privacy</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Terms and Policies</Text>
        </TouchableWithoutFeedback>
      </View>

      <Text className="font-bold text-gray-400 mb-2 text-sm">Actions</Text>
      <View>
        <TouchableWithoutFeedback className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100">
          <Text className="font-medium text-base">Report a Problem</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex-row justify-between items-center py-3 px-2 border-b border-gray-100"
          onPress={handleLogout}
        >
          <Text className="font-medium text-base">Logout</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Menu;
