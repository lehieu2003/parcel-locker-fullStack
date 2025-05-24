import { Context } from "@/app/contexts/ParcelContext";
import Header from "@/app/Header/HeaderGoBack";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import YesNoCard from "../ReusableComponents/YesNoCard";
import RecipientInformation from "./RecipientInformation";
import SenderInformation from "./SenderInformation";
import Stepper from "./Stepper";
interface FormData {
  recipientFullName: string;
  recipientPrefix: string;
  recipientPhone: string;
  recipientEmail: string;
  senderFullName: string;
  senderPrefix: string;
  senderPhone: string;
  senderEmail: string;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const PeopleDetail = () => {
  const navigation = useNavigation();
  const parcelContext = useContext(Context);
  const [disableNext, setDisableNext] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      // recipientFullName: "Nguyễn Văn B",
      // recipientPrefix: "Ông",
      // recipientPhone: "120-555-1046",
      // recipientEmail: "nguyenvana@example.com",
      // senderFullName: "Trần Thị Q",
      // senderPrefix: "Bà",
      // senderPhone: "260-555-1368",
      // senderEmail: "tranthib@example.com"
      recipientFullName: "",
      recipientPrefix: "",
      recipientPhone: "",
      recipientEmail: "",
      senderFullName: "",
      senderPrefix: "",
      senderPhone: "",
      senderEmail: ""
    }
  });

  const watchRecipientFullName = watch("recipientFullName");
  const watchRecipientPhone = watch("recipientPhone");
  const watchRecipientEmail = watch("recipientEmail");
  const watchSenderFullName = watch("senderFullName");
  const watchSenderPhone = watch("senderPhone");
  const watchSenderEmail = watch("senderEmail");

  const [currentStep, setCurrentStep] = useState(2);
  const [cancelConfirmModalVisible, setCancelConfirmModalVisible] = useState(false);

  useEffect(() => {
    const isComplete =
      watchSenderFullName &&
      watchSenderPhone &&
      watchSenderEmail &&
      parcelContext.senderInfo.senderAddress &&
      watchRecipientFullName &&
      watchRecipientPhone &&
      watchRecipientEmail &&
      parcelContext.recipientInfo.recipientAddress;

    setDisableNext(!isComplete);
  }, [
    watchRecipientFullName,
    watchRecipientPhone,
    watchRecipientEmail,
    parcelContext.senderInfo.senderAddress,
    watchSenderFullName,
    watchSenderPhone,
    watchSenderEmail,
    parcelContext.recipientInfo.recipientAddress
  ]);

  const recipientStep = parcelContext.recipientInfo.recipientAddress ? 1 : 0;
  const senderStep = parcelContext.senderInfo.senderAddress ? 1 : 0;
  const finalStep = currentStep + recipientStep + senderStep;

  const onSubmit = (data: FormData) => {
    parcelContext.setSenderInfo({
      senderFullName: data.senderFullName,
      senderPrefix: data.recipientPrefix,
      senderPhone: data.senderPhone,
      senderEmail: data.senderEmail,
      senderAddress: parcelContext.senderInfo.senderAddress,
      lockerId: parcelContext.senderInfo.lockerId
    });

    parcelContext.setRecipientInfo({
      recipientFullName: data.recipientFullName,
      recipientPrefix: data.recipientPrefix,
      recipientPhone: data.recipientPhone,
      recipientEmail: data.recipientEmail,
      recipientAddress: parcelContext.recipientInfo.recipientAddress,
      lockerId: parcelContext.recipientInfo.lockerId
    });

    navigation.navigate("Send/Summary" as never);
  };

  const onPressViewSender = () => {
    navigation.navigate("Send/InPostSender" as never);
  };

  const onPressViewRecipient = () => {
    navigation.navigate("Send/InPostLocker" as never);
  };
  const onPressViewHome = () => {
    navigation.navigate("Send/InPostHome" as never);
  };

  return (
    <View className="flex-1 flex-col">
      <Header title={"Information"} />

      <Stepper currentStep={finalStep} />
      <ScrollView style={{ paddingHorizontal: 30, flex: 1 }}>
        <SenderInformation
          control={control}
          errors={errors}
          parcelContext={parcelContext}
          onPressViewSender={onPressViewSender}
          validateEmail={validateEmail}
        />

        <RecipientInformation
          control={control}
          errors={errors}
          parcelContext={parcelContext}
          onPressViewRecipient={onPressViewRecipient}
          validateEmail={validateEmail}
          onPressViewHome={onPressViewHome}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
            gap: 50
          }}
        >
          <ButtonComponent
            text="Next"
            width={100}
            backgroundColor="#FF8A00"
            disabled={disableNext}
            onPress={handleSubmit(onSubmit)}
          />
          <ButtonComponent
            text="Cancel"
            width={100}
            backgroundColor="#808080"
            onPress={() => setCancelConfirmModalVisible(true)}
          />
        </View>
        <YesNoCard
          onPressYes={() => navigation.navigate("navigators/HomeNavigator" as never)}
          onPressNo={() => setCancelConfirmModalVisible(false)}
          cancelConfirmModalVisible={cancelConfirmModalVisible}
          setCancelConfirmModalVisible={setCancelConfirmModalVisible}
        />
      </ScrollView>
    </View>
  );
};

export default PeopleDetail;
