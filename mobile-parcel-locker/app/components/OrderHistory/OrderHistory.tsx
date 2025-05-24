import Colors from "@/app/constants/Colors";
import { useAuth } from "@/app/contexts/AuthContext";
import { SearchHomeContext } from "@/app/contexts/SearchHomeContext";
import Header from "@/app/Header/Header";
import { API_ENDPOINT } from "@/app/utils/constants";
import { MediumParcel } from "@/assets/images/Icon";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { OrderType } from "@/app/utils/constants";

const OrderHistory = () => {
  const navigation = useNavigation("");
  const { user } = useAuth();
  const { setInputFocused } = useContext(SearchHomeContext);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState<OrderType>();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorData, setErrorData] = useState<string | null>(null);

  const navigateToQR = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}order/generate_qr?order_id=${selectedParcel?.order_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        console.log("QR code generated successfully");
        navigation.navigate("components/ScanQR/ScanQR" as never);
        return;
      } else {
        try {
          const errorData = await response.json();
          console.log("Error generating QR code: ", errorData.detail || response.statusText);
          setErrorData(errorData.detail || response.statusText);
        } catch (err) {
          console.log("Error generating QR code and parsing response: ", response.statusText);
          setErrorData(response.statusText);
        }
      }
    } catch (error) {
      console.error("Error generating QR code", error);
      setErrorData(String(error));
    }
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const getOrderAPI_ENDPOINT = `${API_ENDPOINT}order/history/?page=1&per_page=20`;
      try {
        const response = await fetch(getOrderAPI_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.data);
        } else {
          console.error("Error fetching orders: ", response.statusText);
          setErrorData(response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders and locker addresses", error);
        setErrorData(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user?.accessToken]);

  // Filtering parcels and sorting them inside the render method can be optimized by memoizing the results to prevent unnecessary recalculations on every render.
  const filteredParcels = useMemo(() => {
    return orders.filter((item) => {
      const matchesStatus = selectedStatus === "all" || item.order_status === selectedStatus;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearchQuery =
        item.order_id.toString().includes(searchLower) ||
        item.order_status.toLowerCase().includes(searchLower) ||
        item.ordering_date.toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearchQuery;
    });
  }, [orders, selectedStatus, searchQuery]);

  const getStatusProgressColor = (status: string) => {
    switch (status) {
      case "Packaging":
        return [Colors.orange_1, Colors.grey, Colors.grey, Colors.grey, Colors.grey];
      case "Waiting":
        return [Colors.orange_1, Colors.orange_1, Colors.grey, Colors.grey, Colors.grey];
      case "Ongoing":
        return [Colors.orange_1, Colors.orange_1, Colors.orange_1, Colors.grey, Colors.grey];
      case "Delivered":
        return [Colors.orange_1, Colors.orange_1, Colors.orange_1, Colors.orange_1, Colors.grey];
      case "Completed":
        return [Colors.orange_1, Colors.orange_1, Colors.orange_1, Colors.orange_1, Colors.orange_1];
      case "Warning":
        return [Colors.red, Colors.red, Colors.red, Colors.red, Colors.red, Colors.red];
      default:
        return [Colors.grey, Colors.grey, Colors.grey, Colors.grey, Colors.grey, Colors.grey];
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "Packaging":
        return { color: "#E68C3A", backgroundColor: "#FFDAB9" };
      case "Waiting":
        return { color: "#213E60", backgroundColor: "#FFD700" };
      case "Ongoing":
        return { color: "#8E9109", backgroundColor: "#F4F767" };
      case "Delivered":
        return { color: "red", backgroundColor: "darkblue" };
      case "Completed":
        return { color: "#22C232", backgroundColor: "#ACF4B8" };
      case "Warning":
        return { color: "#C7250F", backgroundColor: "#C7250F" };

      default:
        return { color: "black", backgroundColor: "white" };
    }
  };

  const renderParcelItem = ({ item }: { item: OrderType }) => {
    return (
      <View className="flex-1 flex-col p-3 gap-2 pt-0 mb-1 ">
        <View className="h-[2px] w-full bg-slate-300 rounded mb-2"></View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-[16px] text-[#808080]">Receiver:</Text>
            <Text className="text-[15px] font-medium ml-2">{item?.sender_information.name}</Text>
          </View>
          <View>
            <Text className="text-[16px] text-[#808080]">Completed date:</Text>
            <Text className="text-[15px] font-medium ml-2">{item?.receiving_date}</Text>
          </View>
        </View>
        <View>
          <Text className="text-[16px] text-[#808080]">Total Payment:</Text>
          <Text className="text-[15px] font-medium ml-2">{item?.totalPayment}200.000 VND</Text>
        </View>
        <View className="h-[2px] w-full bg-slate-300 rounded mb-2"></View>

        <View className="flex-row items-start">
          <View className="items-center mr-[10px] mt-1">
            <View className="w-[10px] h-[10px] rounded-[5px] bg-[#213E60]"></View>
            <View className="w-[2px] h-[67px] bg-[#213E60]"></View>
            <View className="w-[10px] h-[10px] rounded-[5px] bg-[#213E60] mb-[4px]"></View>
          </View>
          <View className="flex-1 gap-4">
            <View>
              <Text className="text-[16px] text-[#808080]">From</Text>
              <Text className="text-[15px] font-medium ml-2">{item?.sending_address?.addressName}</Text>
            </View>

            <View>
              <Text className="text-[16px] text-[#808080]">To</Text>
              <Text className="text-[15px] font-medium ml-2">{item?.receiving_address?.addressName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header title={"Order history"} />

      <TouchableOpacity style={styles.searchBar}>
        <Icon name="search" size={20} color="grey" />
        <TextInput
          style={{ marginLeft: 5, width: 280 }}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </TouchableOpacity>
      <View style={styles.statusRow}>
        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "all" && styles.activeStatus]}
          onPress={() => setSelectedStatus("all")}
        >
          <Text style={styles.statusTextContent}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Packaging" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Packaging")}
        >
          <Text style={styles.statusTextContent}>Packaging</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Waiting" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Waiting")}
        >
          <Text style={styles.statusTextContent}>Waiting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Ongoing" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Ongoing")}
        >
          <Text style={styles.statusTextContent}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Delivered" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Delivered")}
        >
          <Text style={styles.statusTextContent}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Completed" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Completed")}
        >
          <Text style={styles.statusTextContent}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusText, selectedStatus === "Warning" && styles.activeStatus]}
          onPress={() => setSelectedStatus("Warning")}
        >
          <Text style={styles.statusTextContent}>Warning</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <View className="flex justify-center items-center mt-32">
            <View
              className="w-[80%] justify-center items-center p-[20px] bg-white rounded-[10px]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <Text className="text-[18px] font-bold mb-[10px]">Loading Orders</Text>
              <Text className="text-[14px] text-[#666] text-center">
                Please wait while we load your order history...
              </Text>
              <ActivityIndicator size="large" color="#ff8c00" />
            </View>
          </View>
        ) : errorData ? (
          <View className="flex justify-center items-center mt-32">
            <View
              className="flex flex-col w-[80%] items-center p-[20px] bg-white rounded-[10px]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <Text className="text-[14px] text-[#666] text-center mb-3">{errorData}</Text>
              <ButtonComponent
                text="Back"
                alignSelf="center"
                width={150}
                backgroundColor={Colors.orange_1}
                onPress={() => {
                  setErrorData(null);
                }}
              />
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 420 }}>
            {filteredParcels.map((item, index) => {
              const { color, backgroundColor } = getStatusColors(item.order_status);
              return (
                <TouchableOpacity
                  style={styles.parcelContainer}
                  key={index}
                  onPress={() => {
                    actionSheetRef.current?.show();
                    setSelectedParcel(item);
                  }}
                >
                  <ActionSheet ref={actionSheetRef} gestureEnabled>
                    <FlatList
                      data={selectedParcel ? [selectedParcel] : []}
                      keyExtractor={(selectedParcel) => selectedParcel?.order_id.toString() || ""}
                      renderItem={renderParcelItem}
                      className="p-5"
                      contentContainerStyle={{ paddingBottom: 8 }}
                      ListHeaderComponent={
                        <View className="flex-row justify-between mb-3">
                          <Text className="text-[#213E60] font-medium text-[25px]">
                            Order #{selectedParcel?.order_id}
                          </Text>
                          <View className="p-2 rounded-xl" style={{ backgroundColor }}>
                            <Text style={{ fontSize: 16, color, fontWeight: "bold", textAlign: "center" }}>
                              {selectedParcel?.order_status}
                            </Text>
                          </View>
                        </View>
                      }
                      ListFooterComponent={() => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <ButtonComponent
                            text="Back"
                            alignSelf="center"
                            width={150}
                            backgroundColor={Colors.orange_1}
                            onPress={() => {
                              actionSheetRef.current?.hide();
                            }}
                          />
                          <ButtonComponent
                            text="Scan QR"
                            alignSelf="center"
                            width={150}
                            backgroundColor={Colors.orange_1}
                            onPress={navigateToQR}
                          />
                        </View>
                      )}
                    />
                  </ActionSheet>
                  <View style={{ flexDirection: "row" }}>
                    {Array(6)
                      .fill(null)
                      .map((_, processLineIndex) => (
                        <View
                          key={processLineIndex}
                          style={[
                            styles.processLine,
                            {
                              backgroundColor: getStatusProgressColor(item.order_status)[processLineIndex],
                              borderColor: getStatusProgressColor(item.order_status)[processLineIndex]
                            }
                          ]}
                        />
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                      paddingLeft: 5,
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={{
                        flexGrow: 1,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <MediumParcel />
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "mon-sb",
                          color: "#000",
                          paddingLeft: 10
                        }}
                      >
                        {item?.order_id}
                      </Text>
                    </View>
                    <View style={{ flexGrow: 0 }}>
                      <Text
                        style={{
                          borderRadius: 20,
                          backgroundColor,
                          paddingVertical: 0.5,
                          paddingHorizontal: 10,
                          color,
                          fontSize: 13
                        }}
                      >
                        {item?.order_status}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View style={styles.line} />
                    <View style={styles.dashedLine} />
                    <View style={styles.line} />
                  </View>
                  <View>
                    <Text style={styles.parcelSize}>{item?.ordering_date}</Text>
                    <Text style={styles.parcelSize}>{item?.sending_address?.addressName}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5
  },
  text: {
    fontSize: 35,
    fontFamily: "mon-sb",
    color: "#000",
    marginBottom: 20
  },
  parcelContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#fff",
    borderColor: Colors.grey,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5
  },
  parcelText: {
    fontSize: 20,
    fontFamily: "mon-sb",
    color: "#000"
  },
  parcelSize: {
    paddingTop: 5,
    marginStart: 5,
    fontSize: 13,
    fontFamily: "mon-sb",
    color: Colors.grey
  },
  line: {
    height: 1,
    flex: 0.01,
    backgroundColor: Colors.grey
  },
  dashedLine: {
    height: 1,
    flex: 30,
    borderWidth: 0.5,
    borderColor: Colors.grey,
    borderStyle: "dashed"
  },
  processLine: {
    height: 1,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    borderColor: Colors.grey,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.grey,
    marginBottom: 15
  },
  statusRow: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  statusText: {
    borderRadius: 5
  },
  activeStatus: {
    borderBottomColor: Colors.orange_1,
    borderBottomWidth: 1
  },
  statusTextContent: {
    fontSize: 13,
    color: Colors.grey
  }
});

export default OrderHistory;
