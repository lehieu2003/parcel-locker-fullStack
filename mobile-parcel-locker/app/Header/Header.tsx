import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/app/constants/Colors";
interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark_blue_1,
    height: 100,
    paddingTop: 30,
    paddingLeft: 10
  },
  title: {
    fontSize: 20,
    fontFamily: "mon-b",
    color: Colors.white
  }
});

export default Header;
