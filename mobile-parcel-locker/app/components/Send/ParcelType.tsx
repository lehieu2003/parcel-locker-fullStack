import { Pressable, StyleSheet, Text, View } from "react-native";
interface ParcelTypeProps {
  packagingTypeList: { type: string; text: string }[];
  handleSelectPackingType: (type: string, text: string) => void;
  typeList: string[];
}

const ParcelType: React.FC<ParcelTypeProps> = ({ packagingTypeList, handleSelectPackingType, typeList }) => {
  return (
    <View className="flex-col px-[10px] justify-center mt-5">
      <Text className="text-[22px] mb-[7px] self-start font-bold text-[#213E60]">Packaging type</Text>
      <View className="flex flex-row flex-wrap gap-y-2 gap-x-1">
        {packagingTypeList.map((item: any) => (
          <Pressable
            key={item.type}
            style={typeList.includes(item.type) ? styles.chosenBtnStyle : styles.btnStyle}
            onPress={() => handleSelectPackingType(item.type, item.text)}
          >
            <Text style={[typeList.includes(item.type) ? { color: "white" } : { color: "black" }, styles.categoryText]}>
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    color: "black",
    backgroundColor: "#ede7df",
    padding: 8,
    borderRadius: 5
  },
  chosenBtnStyle: {
    color: "black",
    backgroundColor: "#FF8A00",
    padding: 8,
    borderRadius: 5
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "medium"
  }
});

export default ParcelType;
