import React from "react";
import { Image, View, Text } from "react-native";
const Configuring = () => {
  return (
    <View className="flex flex-1 flex-col justify-center items-center">
      <Image source={require("../../../assets/images/configuring.png")} className="w-40 h-40"></Image>
      <View>
        <Text className="font-semibold text-3xl text-gray-800 text-center">Configuring...</Text>
        <Text className="text-xl text-gray-800 text-center">Your location is being updated......</Text>
        <Text className="text-xl text-gray-800 text-center">Finding the nearest booking.</Text>
      </View>
    </View>
  );
};

export default Configuring;
