import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import DeliveryTruck from "../../../assets/Animation/delivery-truck.gif";
import Box from "../../../assets/Animation/box.gif";
import Work from "../../../assets/Animation/work.gif";
import { TouchableOpacity } from "react-native-gesture-handler";

const features = [
  {
    title: "Live parcel tracking",
    description: "Update shipping status in real time"
  },
  {
    title: "Easy locker management",
    description: "Create, manage, and check parcels in lockers"
  },
  {
    title: "Seamless collaboration",
    description: "Connect with shippers and customers in real-time"
  }
];

const OnboardingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View className="flex-1 justify-center items-center bg-white relative">
      <Swiper
        loop={false}
        onIndexChanged={(index) => setIndex(index)}
        index={index}
        activeDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 7.5,
          backgroundColor: "#FF8A00"
        }}
      >
        <View className="flex-1 justify-center items-center">
          <Image source={DeliveryTruck} resizeMode="contain" className="w-[100px] h-[100px]" />
        </View>
        <View className="flex-1 justify-center items-center">
          <Image source={Box} resizeMode="contain" className="w-[100px] h-[100px]" />
        </View>

        <View className="flex-1 justify-center items-center">
          <Image source={Work} resizeMode="contain" className="w-[100px] h-[100px]" />
        </View>
      </Swiper>

      <View className="flex-col bg-[#213E60] w-full rounded-t-[30px] p-4">
        <Text className="text-[20px] font-semibold text-center text-white">{features[index].title} </Text>
        <Text className="text-[20px] font-semibold text-center text-white">{features[index].description}</Text>
        <View className="flex-row justify-between items-center px-[16px] py-[20px]">
          <TouchableOpacity onPress={() => navigation.navigate("components/Auth/LoginScreen")}>
            <Text className="text-[16px] font-medium text-white">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (index < 2 ? setIndex(index + 1) : navigation.navigate("components/Auth/LoginScreen"))}
          >
            <Text className="text-[16px] font-medium text-white">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
