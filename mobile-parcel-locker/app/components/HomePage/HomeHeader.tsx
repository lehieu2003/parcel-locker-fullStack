import Colors from "@/app/constants/Colors";
import { useAuth } from "@/app/contexts/AuthContext";
import { SearchHomeContext } from "@/app/contexts/SearchHomeContext";
import { UserImage } from "@/assets/images/Icon/index";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeHeader = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { setInputFocused } = useContext(SearchHomeContext);
  const navigation = useNavigation();

  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
  };

  const getDayPart = (hour: number) => {
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";
    } else if (hour >= 17 && hour < 20) {
      return "evening";
    } else {
      return "night";
    }
  };

  const currentHour = getCurrentHour();
  const dayPart = getDayPart(currentHour);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View className="bg-[#213E60] h-45 px-5 pt-12">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            <UserImage className="w-10 h-10 self-end" />
            <View className="flex flex-col">
              <Text className="font-mon-sb text-[#E68C3A] font-bold text-[18px]"> Good {dayPart}</Text>
              <Text className="font-mon-sb text-white text-[16px] ml-1">{user?.username}</Text>
            </View>
          </View>
          <Icon name="bars" color="white" size={30} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
        </View>
        <SearchBar
          containerStyle={styles.searchBar_container}
          inputContainerStyle={styles.searchBar_input_container}
          placeholder="Search your parcels..."
          value={search}
          onChangeText={(text) => setSearch(text)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  searchBar_container: {
    borderColor: "transparent",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    marginTop: 10,
    flexDirection: "row",
    marginBottom: 10
  },
  searchBar_input_container: {
    backgroundColor: Colors.dark_blue_2,
    borderRadius: 10
  }
});

export default HomeHeader;
