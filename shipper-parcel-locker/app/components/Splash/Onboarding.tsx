import React from "react";
import { Image, Text, View } from "react-native";
import DeliveryTruck from "../../../assets/Animation/delivery-truck1.gif";
import Safe from "../../../assets/Animation/safe1.gif";
import Focus from "../../../assets/Animation/focus1.gif";
import QuickResponse from "../../../assets/Animation/quick-response1.gif";
import ButtonComponent from "../ReusableComponents/ButtonComponent";

const Onboarding = ({ navigation }: any) => {
  const handlePress = () => {
    navigation.navigate("components/Auth/LoginScreen" as never);
  };

  return (
    <View className="flex-1 flex-col items-center justify-center px-10 bg-white">
      <Image source={DeliveryTruck} resizeMode="contain" className="w-[100px] h-[100px]" />

      <View>
        <Text className="text-[30px] font-medium text-center">Welcome to </Text>
        <Text className="text-[30px] font-medium text-center">Shipper app</Text>
      </View>

      <View className="flex-col gap-6 mt-2 mb-10">
        <View className="flex-row items-center gap-2">
          <Image source={Safe} resizeMode="contain" className="w-[50px] h-[50px]" />
          <View className="flex-col gap-1">
            <Text className="text-[16px] font-bold">Safe and careful delivery</Text>
            <View className="flex-col ">
              <Text className="text-[16px] font-medium text-[#808080]" numberOfLines={2} ellipsizeMode="tail">
                Delivering with care, every step
              </Text>
              <Text className="text-[16px] font-medium text-[#808080]" numberOfLines={2} ellipsizeMode="tail">
                of the way
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Image source={QuickResponse} resizeMode="contain" className="w-[50px] h-[50px]" />
          <View className="flex-col gap-1">
            <Text className="text-[16px] font-bold">Quick service</Text>
            <View className="flex-row flex-wrap ">
              <Text className="text-[16px] font-medium text-[#808080]" numberOfLines={2} ellipsizeMode="tail">
                Fast, reliable, and right to your dooraaaaaaa
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-start gap-2">
          <Image source={Focus} resizeMode="contain" className="w-[50px] h-[50px]" />
          <View className="flex-col gap-1">
            <Text className="text-[16px] font-bold">Focused on your delivery</Text>
            <Text className="text-[16px] font-medium text-[#808080]" numberOfLines={2} ellipsizeMode="tail">
              Your packages, our priority
            </Text>
          </View>
        </View>
      </View>

      <ButtonComponent
        onPress={handlePress}
        text="Get Started"
        width={300}
        alignSelf="center"
        backgroundColor="#213E60"
      />
    </View>
  );
};

export default Onboarding;
