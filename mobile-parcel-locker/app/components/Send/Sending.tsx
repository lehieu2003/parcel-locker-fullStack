import { Context } from "@/app/contexts/ParcelContext";
import Header from "@/app/Header/HeaderGoBack";
import { packagingTypeList, sendingTypes } from "@/app/utils/constants";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import YesNoCard from "../ReusableComponents/YesNoCard";
import ParcelSize from "./ParcelSize";
import ParcelType from "./ParcelType";
import SendingMode from "./SendingMode";
import Stepper from "./Stepper";
import { ScrollView } from "react-native-gesture-handler";

const Send = () => {
  const navigation = useNavigation();
  const parcelContext = useContext(Context);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      width: "",
      height: "",
      length: "",
      weight: ""
    }
  });

  const watchedWidth = watch("width");
  const watchedHeight = watch("height");
  const watchedLength = watch("length");
  const watchedWeight = watch("weight");

  const [currentStep, setCurrentStep] = useState(1);
  const [disableNext, setDisableNext] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [typeList, setTypeList] = useState<string[]>([]);
  const [typeText, setTypeText] = useState<string[]>([]);
  const [cancelConfirmModalVisible, setCancelConfirmModalVisible] = useState(false);

  useEffect(() => {
    if (checkedIndex >= 0 && parcelContext.parcel.sendingType !== sendingTypes[checkedIndex]) {
      parcelContext.setSendingType(sendingTypes[checkedIndex]);
    }
  }, [checkedIndex, parcelContext]);

  useEffect(() => {
    if (
      typeList.length !== parcelContext.parcel.parcelType.type.length ||
      typeText.length !== parcelContext.parcel.parcelType.text.length
    ) {
      parcelContext.setParcelType({ type: typeList, text: typeText });
    }
  }, [typeList, typeText, parcelContext]);

  const isComplete = useMemo(() => {
    return (
      parcelContext.parcel.sendingType &&
      parcelContext.parcel.parcelType.type.length > 0 &&
      watchedWidth &&
      watchedHeight &&
      watchedLength &&
      watchedWeight
    );
  }, [
    parcelContext.parcel.sendingType,
    parcelContext.parcel.parcelType.type,
    watchedWidth,
    watchedHeight,
    watchedLength,
    watchedWeight
  ]);

  useEffect(() => {
    setDisableNext(!isComplete);
  }, [isComplete]);

  const handleSelectPackingType = (type: string, text: string) => {
    const updatedTypeList = typeList.includes(type) ? typeList.filter((item) => item !== type) : [...typeList, type];
    const updatedTypeText = typeText.includes(text) ? typeText.filter((item) => item !== text) : [...typeText, text];

    setTypeList(updatedTypeList);
    setTypeText(updatedTypeText);
  };

  const handleSelectSendingMode = (index: number) => {
    setCheckedIndex(index);
  };

  const validateInput = (value: string) => {
    const reg = /^\d{1,2}(\.\d{1})?$/;
    return reg.test(value) && Number(value) > 0 && Number(value) < 41;
  };

  const iconSet = useMemo(
    () => (width: number, height: number, length: number) => {
      if (Number(width) < 8 || Number(height) < 38 || Number(length) < 64) {
        return "SmallParcel";
      } else if (Number(width) < 19 || Number(height) < 38 || Number(length) < 64) {
        return "MediumParcel";
      } else {
        return "LargeParcel";
      }
    },
    []
  );

  // useCallback is used to prevent re-rendering
  const onSubmit = React.useCallback(
    (data: { width: string; height: string; length: string; weight: string }) => {
      parcelContext.setParcelSize({
        width: Number(data.width),
        height: Number(data.height),
        length: Number(data.length),
        weight: Number(data.weight),
        icon: iconSet(Number(data.width), Number(data.height), Number(data.length)),
        recomendedSize: ""
      });
      navigation.navigate("Send/PeopleDetail" as never);
    },
    [parcelContext, navigation, iconSet]
  );

  return (
    <ScrollView>
      <Header title={"Send parcel"} />
      <Stepper currentStep={currentStep} />
      <SendingMode
        sendingTypes={sendingTypes}
        checkedIndex={checkedIndex}
        handleSelectSendingMode={handleSelectSendingMode}
      />
      <ParcelType
        packagingTypeList={packagingTypeList}
        handleSelectPackingType={handleSelectPackingType}
        typeList={typeList}
      />
      <ParcelSize control={control} errors={errors} validateInput={validateInput} parcelContext={parcelContext} />
      <YesNoCard
        onPressYes={() => navigation.navigate("navigators/HomeNavigator" as never)}
        onPressNo={() => setCancelConfirmModalVisible(false)}
        cancelConfirmModalVisible={cancelConfirmModalVisible}
        setCancelConfirmModalVisible={setCancelConfirmModalVisible}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 60,
          gap: 50
        }}
      >
        <ButtonComponent
          text="Next"
          width={100}
          backgroundColor="#FF8A00"
          disabled={disableNext}
          onPress={React.useMemo(() => handleSubmit(onSubmit), [onSubmit, handleSubmit])} // useMemo is used to prevent re-rendering
        />
        <ButtonComponent
          text="Cancel"
          width={100}
          backgroundColor="#808080"
          onPress={() => setCancelConfirmModalVisible(true)}
        />
      </View>
    </ScrollView>
  );
};

export default Send;
