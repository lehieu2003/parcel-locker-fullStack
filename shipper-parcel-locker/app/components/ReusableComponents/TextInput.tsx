import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface TextInputProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  keyboardType?: any;
  value: string;
  secureTextEntry?: boolean;
  iconName?: keyof typeof FontAwesome.glyphMap;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInputComponent = (props: TextInputProps) => {
  const { onChangeText, placeholder, style, keyboardType, value, secureTextEntry, iconName, onFocus, onBlur } = props;

  return (
    <View style={[styles.container, style]}>
      {iconName && <FontAwesome name={iconName} size={20} style={styles.icon} />}
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF"
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16
  },
  icon: {
    marginRight: 10,
    color: "#D1D5DB"
  }
});

export default TextInputComponent;
