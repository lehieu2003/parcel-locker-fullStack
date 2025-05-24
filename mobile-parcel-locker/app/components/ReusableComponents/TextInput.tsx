import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface TextInputProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  keyboardType?: any;
  value: string;
  secureTextEntry?: boolean;
}

const TextInputComponent = (props: TextInputProps) => {
  const { onChangeText, placeholder, style, keyboardType, value, secureTextEntry } = props;

  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, style]}
      keyboardType={keyboardType}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: "#FFFFFF",
    fontSize: 16
  }
});

export default TextInputComponent;
