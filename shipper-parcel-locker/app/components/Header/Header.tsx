import Colors from "@/app/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
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

export default Header;
