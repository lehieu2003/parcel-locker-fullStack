import Stepper from "@/app/components/Send/Stepper";
import { useAuth } from "@/app/contexts/AuthContext";
import { Context } from "@/app/contexts/ParcelContext";
import Header from "@/app/Header/HeaderGoBack";
import { API_ENDPOINT } from "@/app/utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Modal, Platform, StyleSheet, Text, View } from "react-native";
import { TriggerNotification } from "../../components/PushNotification/Push";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import YesNoCard from "../ReusableComponents/YesNoCard";
import { useNotification } from "@/app/contexts/NotificationContext";

async function registerForPushNotificationsAsync() {
  let status;

  if (Platform.OS === "android") {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
      })
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  status = existingStatus;

  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    status = newStatus;
  }

  return status === "granted";
}

const order_API_ENDPOINT = API_ENDPOINT + "order/";
const Summary = () => {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  const navigation = useNavigation();
  const parcelContext = useContext(Context);
  const { user } = useAuth();
  const { notificationsEnabled, sendNotification } = useNotification(); // add sendNotification
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(5);
  const [cancelConfirmModalVisible, setCancelConfirmModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const token = user?.accessToken;

  const handleOnpress = async () => {
    try {
      if (!token) {
        console.error("No access token found");
        return;
      }

      const parcelData = {
        parcel: {
          width: parcelContext.parcel.parcelSize?.width || 0,
          length: parcelContext.parcel.parcelSize?.length || 0,
          height: parcelContext.parcel.parcelSize?.height || 0,
          weight: parcelContext.parcel.parcelSize?.weight || 0
        },

        recipient_phone: parcelContext.recipientInfo?.recipientPhone,

        sending_locker_id: parcelContext.senderInfo?.lockerId,
        receiving_locker_id: parcelContext.recipientInfo?.lockerId
      };

      const response = await fetch(order_API_ENDPOINT, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parcelData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        if (notificationsEnabled) {
          TriggerNotification(true, responseData);
          sendNotification("Order created successfully!"); // add sendNotification when order is created successfully
        }
        setModalVisible(true);
      } else {
        const errorData = await response.json();

        if (errorData.detail === "No available cells in receiving locker") {
          setError("Sorry, there are no available slots in receiving locker. Please choose another location.");
        } else if (errorData.detail === "No available cells in sending locker") {
          setError("Sorry, there are no available slots in sending locker. Please choose another location.");
        } else if (errorData.detail === "No available locker") {
          setError("Sorry, there are no available lockers. Please choose another location.");
        } else {
          setError("An error occurred. Please try again later.");
        }
        if (notificationsEnabled) {
          TriggerNotification(false, {
            order_id: "",
            parcel_size: "",
            sender_id: "",
            message: errorData?.toString()
          });
          sendNotification("Failed to create order"); // add sendNotification when order creation fails
        }
        console.log("Error:", errorData);
        console.log("parcel info:", parcelData);
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (notificationsEnabled) {
        TriggerNotification(false, {
          order_id: "",
          parcel_size: "",
          sender_id: "",
          message: error
        });
        sendNotification("An error occurred: " + error.toString()); // add sendNotification when an error occurs
      }
    }
  };

  return (
    <View className="flex-1 flex-col bg-white">
      <Header title="Summary" />
      <Stepper currentStep={currentStep} />

      <View className="flex flex-row justify-center p-4">
        <View className="flex flex-col items-center justify-center">
          <Image source={parcelContext.parcel.sendingType?.iconFrom as any} style={{ width: 35, height: 35 }} />

          <Text className="text-sm font-semibold text-[#213E60]">Locker</Text>
        </View>
        <MaterialCommunityIcons style={styles.icon} cl name="arrow-right" size={16} color="#FF8A00" />
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Image source={parcelContext.parcel.sendingType?.iconTo as any} style={{ width: 35, height: 35 }} />

          <Text className="text-sm font-semibold text-[#213E60]">{parcelContext.parcel.sendingType?.textTo}</Text>
        </View>
      </View>

      <View className="flex flex-col p-2 mt-2">
        <View className="flex flex-col p-2 rounded-md border-[#BCBCBC] border">
          <Text className="font-semibold text-lg text-[#213E60]">Parcel</Text>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Size:</Text>
            <Text className="font-medium text-sm text-[#808080]">
              {parcelContext.parcel.parcelSize?.width} cm x {parcelContext.parcel.parcelSize?.height} cm x
              {parcelContext.parcel.parcelSize?.length} cm
            </Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Weight:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.parcel.parcelSize?.weight} grams</Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Type:</Text>
            <Text className="font-medium text-sm text-[#808080]">
              {parcelContext.parcel.parcelType.type.join(", ")}{" "}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col p-2">
        <View className="flex flex-col p-2 rounded-md border-[#BCBCBC] border">
          <Text className="font-semibold text-lg text-[#213E60]">Sender</Text>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Name:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.senderInfo?.senderFullName}</Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Phone number:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.senderInfo?.senderPhone}</Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Email:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.senderInfo?.senderEmail}</Text>
          </View>
          <View className="flex flex-col px-2">
            <Text className="font-medium text-sm text-[#808080]">Locker address:</Text>
            <Text className="font-medium text-sm text-[#808080] flex-shrink">
              {parcelContext.senderInfo?.senderAddress}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col p-2">
        <View className="flex flex-col p-2 rounded-md border-[#BCBCBC] border">
          <Text className="font-semibold text-lg text-[#213E60]">Receiver</Text>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Name:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.recipientInfo?.recipientFullName}</Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Phone number:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.recipientInfo?.recipientPhone}</Text>
          </View>
          <View className="flex flex-row px-2 gap-2">
            <Text className="font-medium text-sm text-[#808080]">Email:</Text>
            <Text className="font-medium text-sm text-[#808080]">{parcelContext.recipientInfo?.recipientEmail}</Text>
          </View>
          <View className="flex flex-col px-2">
            <Text className="font-medium text-sm text-[#808080]">Locker address:</Text>
            <Text className="font-medium text-sm text-[#808080] flex-shrink">
              {" "}
              {parcelContext.recipientInfo?.recipientAddress}
            </Text>
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#00000080]">
          <View className="bg-white rounded-lg p-5 w-[80%] items-center">
            <View className="bg-[#F57C00] rounded-full p-5">
              <Text className="text-white text-5xl">✔️</Text>
            </View>
            <Text className="text-[#213E60] text-xl font-bold mt-4 text-center">Order successful!</Text>
            <Text className="text-[#878787] text-sm my-2 text-center font-bold">
              Return to the home page to create new order
            </Text>
            <ButtonComponent
              text="Back to home"
              backgroundColor="#F57C00"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("navigators/HomeNavigator" as never);
              }}
              alignSelf="center"
              width={170}
            />
          </View>
        </View>
      </Modal>

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
          marginTop: 5,
          gap: 50
        }}
      >
        <ButtonComponent text="Confirm" width={100} backgroundColor="#FF8A00" onPress={handleOnpress} />
        <ButtonComponent
          text="Cancel"
          width={100}
          backgroundColor="#808080"
          onPress={() => setCancelConfirmModalVisible(true)}
        />
      </View>
    </View>
  );
};
export default Summary;

const styles = StyleSheet.create({
  icon: {
    padding: 8
  }
});
