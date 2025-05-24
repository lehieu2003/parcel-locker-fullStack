import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
const SplashScreen = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("components/Splash/Onboarding" as never);
  };

  return (
    <View className="flex-col bg-[#213E60] justify-center">
      <View className="flex flex-col justify-center gap-2 px-[21px] mt-10 mb-10">
        <Text className="text-white text-[40px] font-semibold content-center">
          Life is busy. Parcel Locker makes deliveries easy.
        </Text>
        <Text className="text-white text-[19px] font-semibold">Never miss a package again. </Text>
        <ButtonComponent
          text="Start delivering"
          width={160}
          alignSelf="flex-end"
          marginTop={10}
          backgroundColor="#FF8210"
          onPress={handlePress}
        />
      </View>

      <View className="flex-1 relative">
        <View className="absolute top-10 left-6">
          <Image
            source={require("../../../assets/images/splash.png")}
            resizeMode="contain"
            className="w-[300px] h-[300px]"
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
