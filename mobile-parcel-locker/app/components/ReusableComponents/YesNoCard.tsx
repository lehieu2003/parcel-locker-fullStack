import { defaultStyles } from "@/app/constants/Styles";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface YesNoCardProps {
  onPressYes: () => void;
  onPressNo: () => void;
  cancelConfirmModalVisible: boolean;
  setCancelConfirmModalVisible: (value: boolean) => void;
}

const YesNoCard = (props: YesNoCardProps) => {
  const { cancelConfirmModalVisible, setCancelConfirmModalVisible, onPressYes, onPressNo } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={cancelConfirmModalVisible}
      onRequestClose={() => setCancelConfirmModalVisible(false)}
    >
      <View
        className="flex-1 flex-col justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        <View className="w-3/4 bg-white p-5 rounded-lg flex justify-center items-center">
          <Text className="text-[16px] text-center font-bold">Are you sure you want to cancel the order?</Text>
          <View className="flex-row justify-between gap-4 mt-2">
            <TouchableOpacity style={[defaultStyles.btn, { width: 100 }]} onPress={onPressYes}>
              <Text style={[defaultStyles.btnText]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[defaultStyles.btn, { width: 100, backgroundColor: "#808080" }]}
              onPress={onPressNo}
            >
              <Text style={[defaultStyles.btnText]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default YesNoCard;
