import { defaultStyles } from "@/app/constants/Styles";
import { Controller } from "react-hook-form";
import { TextInput, Text, View } from "react-native";

interface InputHookFormComponentProps {
  control: any;
  name: string;
  placeholder: string;
  rules: any;
  errorMessage: string;
  keyboardType?: any;
  isSecure?: boolean;
  autoCapitalize?: any;
  placeholderTextColor?: string;
  style?: any;
}
const InputHookFormComponent = (props: InputHookFormComponentProps) => {
  const {
    control,
    name,
    placeholder,
    rules,
    errorMessage,
    keyboardType,
    isSecure,
    autoCapitalize,
    placeholderTextColor,
    style
  } = props;
  return (
    <View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={isSecure}
            autoCapitalize={autoCapitalize}
            placeholder={placeholder}
            style={[defaultStyles.inputField, style]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
          />
        )}
        name={name}
      />
      {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
    </View>
  );
};

export default InputHookFormComponent;
