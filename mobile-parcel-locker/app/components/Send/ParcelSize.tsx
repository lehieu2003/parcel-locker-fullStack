import Colors from "@/app/constants/Colors";
import { defaultStyles } from "@/app/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FieldErrors } from "react-hook-form";
import InputHookFormComponent from "../ReusableComponents/InputHookFormComponent";

const ParcelSize = ({
  control,
  errors,
  validateInput,
  parcelContext
}: {
  control: any;
  errors: FieldErrors;
  validateInput: any;
  parcelContext: any;
}) => {
  const [modalVisibilityButton, setModalVisibilityButton] = useState(false);

  return (
    <View className="flex-col mt-5">
      <View>
        <View className="flex-row justify-between mb-[10px] px-[10px]">
          <Text className="text-[22px] self-start font-bold text-[#213E60]">Size</Text>

          <TouchableOpacity onPress={() => setModalVisibilityButton(true)}>
            <MaterialCommunityIcons name="information-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibilityButton}
          onRequestClose={() => setModalVisibilityButton(false)}
        >
          <View
            className="flex-1 justify-center items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <View className="w-4/5 h-3/4 bg-white p-4 rounded-lg">
              <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "mon-b" }}>
                Information about the parcel
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "mon-b", marginVertical: 20 }}>How to pack a parcel</Text>
              <Text style={styles.popupContent}>
                Make sure your parcel is properly secured and measure its size. You can choose from lockers in three
                sizes. Choose the one that best suits the size of your parcel.
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "mon-b", marginVertical: 20 }}>
                Types of size (max up to 15kg)
              </Text>
              <Text style={styles.popupContent}>
                - Small parcel (8 x 20 x 9 cm)
                {"\n"}Example: a CD, a book or a small clothes.
                {"\n"}- Medium parcel (15 x 20 x 8 cm)
                {"\n"}Example: shoes, cosmetics or larger clothes.
                {"\n"}- Large parcel (24 x 20 x 18 cm)
                {"\n"}Example: a coffee maker, aprinter or a game console.
              </Text>

              <TouchableOpacity style={[styles.closeButton]} onPress={() => setModalVisibilityButton(false)}>
                <Text style={[defaultStyles.btnText]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ display: "flex", gap: 10, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <InputHookFormComponent
              control={control}
              name="width"
              placeholder="Width(cm)"
              rules={{ validate: validateInput }}
              errorMessage={errors.width ? "Please enter width" : ""}
              keyboardType="numeric"
              style={{ width: 150 }}
            />
            <InputHookFormComponent
              control={control}
              name="height"
              placeholder="Height(cm)"
              rules={{ validate: validateInput }}
              errorMessage={errors.height ? "Please enter height" : ""}
              keyboardType="numeric"
              style={{ width: 180 }}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <InputHookFormComponent
              control={control}
              name="length"
              placeholder="Length(cm)"
              rules={{ validate: validateInput }}
              errorMessage={errors.length ? "Please enter length" : ""}
              keyboardType="numeric"
              style={{ width: 150 }}
            />

            <InputHookFormComponent
              control={control}
              name="weight"
              placeholder="Weight(gram)"
              rules={{ validate: validateInput }}
              errorMessage={errors.weight ? "Please enter weight" : ""}
              keyboardType="numeric"
              style={{ width: 180 }}
            />
          </View>
        </View>
        {parcelContext.parcel.sendingType ? (
          parcelContext.parcel.parcelType.text.toString() ? null : (
            <Text className="text-red-600 mt-2 ml-3">Please choose Packaging type</Text>
          )
        ) : (
          <Text className="text-red-600 mt-2 ml-3">Please choose Send Mode</Text>
        )}
        {errors.width || errors.height || errors.length || errors.weight ? (
          <Text className="text-red-600 mt-2 ml-3">Please fill all fields</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange_1,
    borderRadius: 7
  },
  popupContent: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "mon-sb",
    fontWeight: "100",
    lineHeight: 20
  },

  error: {
    borderColor: "red"
  }
});

export default ParcelSize;
