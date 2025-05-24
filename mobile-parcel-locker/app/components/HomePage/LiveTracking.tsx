import Colors from "@/app/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LiveTrackingDetails from "../LiveTracking/[id]";
import { useAuth } from "@/app/contexts/AuthContext";
import { API_ENDPOINT } from "@/app/utils/constants";
import { TrackOrderType, statusOrder } from "@/app/utils/constants";
import { SmallParcel, MediumParcel } from "@/assets/images/Icon";

const LiveTracking = () => {
  const { user } = useAuth();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const status = ["Packaging", "Waiting", "Ongoing", "Delivered", "Completed"];
  const [viewMore, setViewMore] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<TrackOrderType>();
  const [trackOrders, setTrackOrders] = useState<TrackOrderType[]>([]);

  useEffect(() => {
    const fetchTrackOrders = async () => {
      const trackOrdersAPI_ENDPOINT = `${API_ENDPOINT}order/history/?page=1&per_page=20`;

      try {
        const response = await fetch(trackOrdersAPI_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const fetchedTrackOrders = data.data;
        setTrackOrders(fetchedTrackOrders);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchTrackOrders();
  }, [user?.accessToken]);

  useEffect(() => {
    if (selectedParcel) {
      console.log("Selected parcel:", selectedParcel.order_id);
      actionSheetRef.current?.show();
    }
  }, [selectedParcel]);

  const handleOnpressLiveTracking = (id: number) => {
    const parcel = trackOrders.find((item) => item.order_id === id);
    setSelectedParcel(parcel);
  };

  return (
    <View className="flex-2 flex-col px-4 pt-3">
      <Text className="text-[24px] font-mon-sb font-medium mb-5 text-[#213E60]">Live tracking</Text>
      <ActionSheet ref={actionSheetRef} gestureEnabled containerStyle={{ borderRadius: 20 }}>
        {selectedParcel && (
          <LiveTrackingDetails
            route={{
              params: {
                selectedParcel: selectedParcel,
                actionSheetRef: actionSheetRef,
                setSelectedParcel: setSelectedParcel
              }
            }}
          />
        )}
      </ActionSheet>
      {trackOrders.map((item, index) => {
        if (index <= 2 || viewMore) {
          return (
            <TouchableOpacity
              onPress={() => handleOnpressLiveTracking(item.order_id)}
              className="flex flex-row p-2.5 border bg-white border-transparent rounded-lg mb-4"
              key={index}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <View className="flex-col">
                {item.parcel.parcel_size === "M" ? <SmallParcel /> : <MediumParcel />}
                <Text className="text-[10px] font-mon-sb text-[#5E5D5E]">
                  {item.parcel.width}x{item.parcel.height}x{item.parcel.length}cm
                </Text>
              </View>
              <View className="flex flex-col pl-2">
                <Text className="text-xl font-mon-sb mb-3">Order#{item.order_id}</Text>

                <View className="flex-row justify-between">
                  {status.map((statusItem, statusIndex) => {
                    return (
                      <View key={statusIndex} style={styles.statusItem}>
                        <View
                          style={{
                            position: "absolute",
                            top: -10,
                            width: 10,
                            height: 10,
                            borderRadius: 50,
                            backgroundColor:
                              statusOrder[item.order_status] >= statusOrder[statusItem] ? Colors.orange_1 : "#BFBFBF"
                          }}
                        >
                          {statusIndex < 4 && (
                            <View
                              style={{
                                height: 2,
                                width: 40,
                                alignItems: "center",
                                position: "absolute",
                                left: 10,
                                top: 4,
                                backgroundColor:
                                  statusOrder[item.order_status] > statusOrder[statusItem] ? Colors.orange_1 : "#BFBFBF"
                              }}
                            ></View>
                          )}
                        </View>
                        <Text style={{ fontSize: 10 }}>{statusItem}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      })}

      <TouchableOpacity className="pb-6" onPress={() => setViewMore((prevViewMore) => !prevViewMore)}>
        <Text className="text-xl text-center text-[#E68C3A]">View more</Text>
        <View className="bg-[#E68C3A] h-0.5 w-20 self-center mb-4"></View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  statusItem: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50
  }
});
export default LiveTracking;
