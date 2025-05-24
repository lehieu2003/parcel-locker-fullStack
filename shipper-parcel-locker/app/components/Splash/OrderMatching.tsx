import React from "react";
import { Image, View, Text } from "react-native";
const OrderMatching = () => {
  return (
    <View className="flex flex-1 flex-col justify-center items-center">
      <Image source={require("../../../assets/images/Matching.png")} className="w-40 h-40"></Image>
      <View>
        <Text className="font-semibold text-3xl text-gray-800 text-center">Order Matching</Text>
        <Text className="text-xl text-gray-800 text-center">Searching for order near you...</Text>
      </View>
    </View>
  );
};

export default OrderMatching;
