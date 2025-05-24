import { defaultStyles } from "@/app/constants/Styles";
import { TouchableOpacity, Text } from "react-native";

interface ButtonComponentProps {
  text: string;
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  width?: number;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  opacity?: number;
  disabled?: boolean;
  styleText?: any;
  styleTouchableOpacity?: any;
  onPress: () => void;
}
const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    text,
    width,
    backgroundColor,
    disabled,
    onPress,
    alignSelf,
    marginTop,
    marginBottom,
    styleText,
    styleTouchableOpacity
  } = props;
  return (
    <TouchableOpacity
      style={[
        defaultStyles.btn,
        {
          width: width,
          backgroundColor: backgroundColor,
          alignSelf: alignSelf as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
          marginTop: marginTop,
          marginBottom: marginBottom,
          opacity: disabled ? 0.5 : 1
        },
        styleTouchableOpacity
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[defaultStyles.btnText, styleText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
