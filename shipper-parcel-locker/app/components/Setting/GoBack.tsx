import Colors from "@/app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HeaderProps {
  title: string;
}

const GoBack: React.FC<HeaderProps> = ({ title }) => {
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
          color={Colors.dark.background}
          style={{
            backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
    height: 100,
    paddingTop: 30,
    paddingLeft: 10,
    gap: 20
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 43
  },
  title: {
    fontSize: 20,
    fontFamily: "mon-b",
    color: Colors.dark_blue_1
  }
});

export default GoBack;
