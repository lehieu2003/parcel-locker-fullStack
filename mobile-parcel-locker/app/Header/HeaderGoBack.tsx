import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/app/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

interface HeaderProps {
  title: string;
}

const HeaderGoBack: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.white}
          style={{
            backgroundColor: Colors.dark_blue_2,
            padding: 10,
            borderRadius: 10,
            alignSelf: "flex-start"
          }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark_blue_1,
    height: 100,
    paddingTop: 30,
    paddingLeft: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 43
  },
  title: {
    fontSize: 20,
    fontFamily: "mon-b",
    color: Colors.white
  }
});

export default HeaderGoBack;
