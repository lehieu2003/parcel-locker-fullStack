import React, { useState } from "react";
import { Text, View, Modal } from "react-native";
import Header from "@/app/Header/HeaderGoBack";
import TextInputComponent from "../ReusableComponents/TextInput";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { useFocusEffect, useNavigation } from "expo-router";

const ChangePassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" }
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: "flex" }
        });
      };
    }, [navigation])
  );

  const handlePasswordReset = () => {
    setModalVisible(true);
  };

  return (
    <View className="flex-1 flex-col bg-white">
      <Header title="Change password" />
      <View className="flex-col gap-2 p-5">
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">Present password</Text>
          <TextInputComponent
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Present password"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">New password</Text>
          <TextInputComponent
            value={newPassword}
            onChangeText={(value) => setNewPassword(value)}
            placeholder="New password"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">Confirm password</Text>
          <TextInputComponent
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            placeholder="Confirm password"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
      </View>
      <ButtonComponent
        text="Reset password"
        alignSelf="center"
        width={200}
        backgroundColor="#F57C00"
        onPress={handlePasswordReset}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#00000080]">
          <View className="bg-white rounded-lg p-5 w-[80%] items-center">
            <View className="bg-[#F57C00] rounded-full p-5">
              <Text className="text-white text-5xl">✔️</Text>
            </View>
            <Text className="text-[#213E60] text-xl font-bold mt-4 text-center">Change password successful!</Text>
            <Text className="text-[#213E60] text-sm my-2">Log out to check password</Text>
            <ButtonComponent
              text="OK"
              backgroundColor="#F57C00"
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}
              alignSelf="center"
              width={100}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePassword;
