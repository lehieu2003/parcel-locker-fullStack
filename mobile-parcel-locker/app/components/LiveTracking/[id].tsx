import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/app/constants/Colors";
import { useNavigation } from "expo-router";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { statusOrder, RootStackParamList } from "@/app/utils/constants";
import { ClipboardIcon, ClockIcon, ReceiverIcon, SenderIcon } from "@/assets/images/Icon";
import { NavigationProp } from "@react-navigation/native";

const LiveTrackingDetails = ({ route }: { route: any }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedParcel, actionSheetRef, setSelectedParcel } = route.params;
  const orderId = selectedParcel?.order_id;
  const status = ["Packaging", "Waiting", "Sending", "Arrived", "Completed"];

  const sendInfo = [
    {
      id: 1,
      title: "Sender",
      name: selectedParcel?.sender_information?.name,
      icon: <SenderIcon />
    },
    {
      id: 2,
      title: "Receiver",
      name: selectedParcel?.recipient_id,
      icon: <ReceiverIcon />
    },
    {
      id: 3,
      title: "Time",
      name: "2-3 Days",
      icon: <ClockIcon />
    },
    {
      id: 4,
      title: "Status",
      name: selectedParcel?.order_status,
      icon: <ClipboardIcon />
    }
  ];

  return (
    <View className="flex-col mt-2">
      <View className="flex-row gap-6 justify-center items-center">
        <View className="flex flex-col">
          <Text className="text-[16px] text-[#636e72]">
            Medium {selectedParcel?.parcel?.weight}kg {selectedParcel?.parcel?.width}x{selectedParcel?.parcel?.height}x
            {selectedParcel?.parcel?.length}cm
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap ml-[30px] justify-between mt-4">
        {sendInfo.map((item) => (
          <View
            key={item.id}
            style={{
              flexBasis: "45%",
              flexDirection: "row",
              margin: 5,
              gap: 5
            }}
          >
            <View>{React.cloneElement(item.icon, { color: "#213E60" })}</View>
            <View className="flex-col items-start justify-center">
              <Text className="font-bold text-[#213E60]">{item.title}</Text>
              <Text className="text-sm font-mon-sb text-[#666666]">{item.name}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row pl-[30px] gap-[15px]">
        <View>
          {status.map((statusItem, statusIndex) => {
            return (
              <View key={statusIndex} style={styles.statusItem}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    backgroundColor:
                      statusOrder[selectedParcel?.order_status ?? ""] >= statusOrder[statusItem]
                        ? Colors.orange_1
                        : "#BFBFBF"
                  }}
                >
                  {statusIndex < 4 && (
                    <View
                      style={{
                        height: 56,
                        width: 5,
                        position: "absolute",
                        left: 13,
                        top: 29.6,
                        backgroundColor:
                          statusOrder[selectedParcel?.order_status ?? ""] > statusOrder[statusItem]
                            ? Colors.orange_1
                            : "#BFBFBF"
                      }}
                    ></View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View className="flex-col flex-1">
          <View className="flex h-[80px] mt-[27px]">
            <Text className="text-2xl font-semibold text-[#213E60]">Packaging</Text>
            <Text className="font-mon text-[#BFBFBF] font-bold">Sender has packaged your parcel!</Text>
          </View>

          <View className="flex h-[80px] mt-[5px]">
            <Text className="text-2xl font-semibold text-[#213E60]">Waiting</Text>
            <Text className="font-mon text-[#BFBFBF] font-bold"> Your parcel is waiting for the delivery system.</Text>
          </View>

          <View className="flex h-[80px] mt-[5px]">
            <Text className="text-2xl font-semibold text-[#213E60]">Sending</Text>
            <Text className="font-mon text-[#BFBFBF] font-bold">
              Sender has dispatched the parcel to our delivery system.
            </Text>
          </View>

          <View className="flex h-[80px] mt-[5px]">
            <Text className="text-2xl font-semibold text-[#213E60]">Arrived</Text>
            <Text className="font-mon text-[#BFBFBF] font-bold">Your parcel is arrived.</Text>
          </View>

          <View className="flex h-[80px] mt-[5px]">
            <Text className="text-2xl font-semibold text-[#213E60]">Completed</Text>
            <Text className="font-mon text-[#BFBFBF] font-bold">You have successfully received your parcel.</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignSelf: "center", gap: 20, marginBottom: 20 }}>
        <ButtonComponent
          text="Back"
          alignSelf="center"
          width={100}
          backgroundColor={Colors.orange_1}
          onPress={() => {
            actionSheetRef.current?.hide();
          }}
        />
        <ButtonComponent
          text="Parcel Location"
          alignSelf="center"
          width={150}
          backgroundColor={Colors.orange_1}
          onPress={() => {
            navigation.navigate("components/Map/TrackingMap", {
              orderId: orderId,
              selectedParcel: selectedParcel,
              setSelectedParcel: setSelectedParcel
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusItem: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 85
  }
});

export default LiveTrackingDetails;
