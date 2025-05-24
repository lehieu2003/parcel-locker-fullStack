import Colors from "@/app/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface SendingType {
  type: string;
  textFrom: string;
  textTo: string;
  iconFrom: string;
  iconTo: string;
  home: boolean;
}
interface SendingModeProps {
  sendingTypes: SendingType[];
  handleSelectSendingMode: (index: number) => void;
  checkedIndex: number;
}

const SendingMode: React.FC<SendingModeProps> = ({ sendingTypes, handleSelectSendingMode, checkedIndex }) => {
  return (
    <View className="flex-col px-[10px] justify-center items-center gap-[10px] mt-[1px]">
      <Text className="font-bold text-[22px] text-[#213E60] mb-[5px] self-start">Send mode</Text>
      <View className="w-full flex-row justify-around">
        {sendingTypes.map((item: any, index: number) => (
          <View key={index}>
            <View
              className="flex-row justify-center items-center gap-[4px] rounded-[5px] mb-[8px] bg-[#BFBFBF] h-[80px]"
              style={{ opacity: 0.9 }}
            >
              <Image source={item.iconFrom} style={{ width: 35, height: 35 }} />
              <AntDesign name="arrowright" size={18} color="#FF8A00" />
              <Image source={item.iconTo} style={{ width: 35, height: 35 }} />
            </View>
            <Pressable
              style={checkedIndex === index ? styles.btnStyleActive : styles.btnStyle}
              onPress={() => {
                handleSelectSendingMode(index);
              }}
            >
              <Text className="text-[15px] text-white font-medium">
                {item.textFrom} to {item.textTo}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyleActive: {
    color: "#213E60",
    backgroundColor: Colors.orange_2,
    padding: 8,
    borderRadius: 5
  },
  btnStyle: {
    color: "black",
    backgroundColor: "#BFBFBF",
    padding: 8,
    borderRadius: 5
  }
});

export default SendingMode;
