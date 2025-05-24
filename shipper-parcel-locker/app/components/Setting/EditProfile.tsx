import React, { useState } from "react";
import { Text, View } from "react-native";
import Header from "../Header/Header";
import TextInputComponent from "../ReusableComponents/TextInput";
import { UserImage } from "@/assets/images/Icon/index";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { useFocusEffect, useNavigation } from "expo-router";
const EditProfile = () => {
  const navigation = useNavigation();

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View className="flex-1 flex-col bg-white">
      <Header title="Edit Profile" />
      <View className="flex-col gap-2 p-5">
        <View className="flex-col gap-1 items-center">
          <UserImage className="w-10 h-10" />
          <Text className="font-medium text-[16px]">Edit profile image</Text>
          <View className="h-0.5 w-24 bg-black" />
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">Name</Text>
          <TextInputComponent
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Name"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">Email</Text>
          <TextInputComponent
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Name"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
        <View className="flex-col gap-2">
          <Text className="text-[#213E60] font-bold text-[18px] self-start ml-5">Phone number</Text>
          <TextInputComponent
            value={phone}
            onChangeText={(value) => setPhone(value)}
            placeholder="Name"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
      </View>
      <ButtonComponent
        text="Save"
        alignSelf="center"
        width={150}
        backgroundColor="#F57C00"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default EditProfile;
