import Colors from "@/app/constants/Colors";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const categories = [
  {
    nameArray: ["Find", "Locker"],
    name: "Find Locker",
    icon: <Image source={require("../../../assets/images/locker.png")} resizeMode="contain" />
  },
  {
    nameArray: ["Create", "Order"],
    name: "Create Order",
    icon: <Image source={require("../../../assets/images/parcel.png")} resizeMode="contain" />
  },
  {
    nameArray: ["Order", "History"],
    name: "Order History",
    icon: <Image source={require("../../../assets/images/history.png")} resizeMode="contain" />
  }
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const Services = ({ onCategoryChanged }: Props) => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<(TouchableOpacity | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
    if (categories[index].name === "Order History") {
      navigation.navigate("components/OrderHistory/OrderHistory" as never);
    }
    if (categories[index].name === "Create Order") {
      navigation.navigate("navigators/SendNavigator" as never);
    }
    if (categories[index].name === "Find Locker") {
      navigation.navigate("components/FindLocker/FindLocker" as never);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 pt-1">
      <Text className="text-[24px] font-medium font-mon-sb text-[#213E60]">Services</Text>
      <View className="flex flex-row justify-start gap-5 items-center pt-1">
        {categories.map((item, index) => (
          <TouchableOpacity
            ref={(el) => (itemsRef.current[index] = el)}
            key={index}
            onPress={() => selectCategory(index)}
            className="flex-col gap-2"
          >
            {item.icon}
            <View>
              <Text
                style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                className="text-center"
              >
                {item.nameArray[0]}
              </Text>
              <Text
                style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                className="text-center"
              >
                {item.nameArray[1]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 11,
    fontFamily: "mon-sb",
    fontWeight: "regular"
  },
  categoryTextActive: {
    fontSize: 12,
    fontFamily: "mon-sb",
    color: Colors.orange_1
  }
});

export default Services;
