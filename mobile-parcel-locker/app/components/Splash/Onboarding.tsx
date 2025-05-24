import React from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import deliveryAnimation from "../../../assets/Animation/delivery-animation.json";
import trackingAnimation from "../../../assets/Animation/tracking-animation.json";
import settingAnimation from "../../../assets/Animation/setting-animation.json";
import connectionAnimation from "../../../assets/Animation/connection-animation.json";
import ButtonComponent from "../ReusableComponents/ButtonComponent";

const features = [
  {
    title: "Live parcel tracking",
    description: "Update shipping status in real time",
    animation: trackingAnimation
  },
  {
    title: "Easy locker management",
    description: "Create, manage, and check parcels in lockers",
    animation: settingAnimation
  },
  {
    title: "Seamless collaboration",
    description: "Connect with shippers and customers in real-time",
    animation: connectionAnimation
  }
];

const Onboarding = ({ navigation }: any) => {
  const handlePress = () => {
    navigation.navigate("components/Splash/OnboardingScreen" as never);
  };

  return (
    <View className="flex-1 flex-col items-center justify-center px-10 bg-white">
      <LottieView source={deliveryAnimation} autoPlay loop style={{ width: 200, height: 200 }} />
      <View>
        <Text className="text-[30px] font-medium text-center">Welcome to </Text>
        <Text className="text-[30px] font-medium text-center">Parcel Locker App</Text>
      </View>

      <View className="flex-col gap-6 mt-2">
        {features.map((feature, index) => (
          <View key={index} className="flex-row gap-1 items-center">
            <LottieView source={feature.animation} autoPlay loop style={{ width: 50, height: 50 }} />
            <View className="flex-col gap-1" style={{ maxWidth: "86%" }}>
              <Text className="text-[16px] font-bold">{feature.title}</Text>
              <Text className="text-[16px] font-medium text-[#808080]">{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <ButtonComponent
        text="Get Started"
        width={300}
        marginTop={30}
        backgroundColor="#213E60"
        onPress={handlePress}
        alignSelf="center"
      />
    </View>
  );
};

export default Onboarding;
