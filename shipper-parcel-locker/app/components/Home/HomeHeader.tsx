import { View, Text } from "react-native";
import { UserImage } from "@/assets/images/Icon/index";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import TextInputComponent from "../ReusableComponents/TextInput";
import { useAuth } from "@/app/contexts/AuthContext";
import { useContext } from "react";
import { SearchOrderHistoryContext } from "@/app/contexts/SearchOrderHistoryContext";
const HomeHeader = () => {
  const { setInputFocused } = useContext(SearchOrderHistoryContext);
  const { user } = useAuth();
  const navigation = useNavigation();
  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
  };

  const getDayPart = (hour: number) => {
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon"; // Trưa
    } else if (hour >= 17 && hour < 20) {
      return "evening";
    } else {
      return "night";
    }
  };

  const currentHour = getCurrentHour();
  const dayPart = getDayPart(currentHour);

  return (
    <View className="flex-col bg-[#213E60] p-5 pt-12 gap-4">
      <View className="flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2">
          <UserImage className="w-10 h-10 self-end" />
          <View className="flex flex-col">
            <Text className="text-[#E68C3A] font-bold text-[18px]">Good {dayPart}</Text>
            <Text className="text-white text-[16px] font-bold">{user?.username}</Text>
          </View>
        </View>
        <Entypo name="menu" size={40} color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>

      <TextInputComponent
        iconName="search"
        placeholder="Search"
        style="bg-white mt-5"
        keyboardType="default"
        value=""
        onChangeText={() => {}}
        secureTextEntry={false}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </View>
  );
};

export default HomeHeader;
