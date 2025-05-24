import React, { useContext, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Colors from "@/app/constants/Colors";
import { defaultStyles } from "@/app/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "@/app/components/Header/Header";
import { MediumParcel, SmallParcel } from "@/assets/images/Icon";
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import { SearchOrderHistoryContext } from "@/app/contexts/SearchOrderHistoryContext";
import Icon from "react-native-vector-icons/FontAwesome";

interface ParcelType {
  id: number;
  name: string;
  date: string;
  from: string;
  to: string;
  backgroundColor: string;
  textColor: string;
  status: string;
  receiver: string;
  totalPayment: string;
  timeToComplete: string;
}

const Parcel = [
  {
    id: 1,
    name: "Shopee",
    width: "20",
    height: "10",
    length: "30",
    status: "Completed",
    icon: MediumParcel,
    date: "17 Ferbury, 2024",
    from: "Locker B13, 81 Le Van Sy, HCMC",
    to: "129 Nguyen Thi Minh Khai, HCMC",
    backgroundColor: "#ACF4B8",
    textColor: "#22C232",
    receiver: "Nguyen Van A",
    totalPayment: "100000",
    timeToComplete: "12:00 PM"
  },
  {
    id: 2,
    name: "Mom",
    width: "8",
    height: "20",
    length: "20",
    status: "Warning",
    icon: SmallParcel,
    date: "17 Ferbury, 2024",
    from: "Locker B13, 81 Le Van Sy, HCMC",
    to: "Locker B13, 81 Le Van Sy, HCMC",
    backgroundColor: "#F4F767",
    textColor: "#8E9109",
    receiver: "Nguyen Van B",
    totalPayment: "200000",
    timeToComplete: "12:00 PM"
  },
  {
    id: 3,
    name: "Lazada",
    width: "20",
    height: "10",
    length: "30",
    status: "Completed",
    icon: MediumParcel,
    date: "18 Ferbury, 2024",
    from: "Locker B13, 81 Le Van Sy, HCMC",
    to: "Locker B18, 81 Hoang Dieu, HCMC",
    backgroundColor: "#ACF4B8",
    textColor: "#22C232",
    receiver: "Nguyen Van C",
    totalPayment: "300000",
    timeToComplete: "12:00 PM"
  },
  {
    id: 4,
    name: "Document",
    width: "8",
    height: "20",
    length: "20",
    status: "Cancelled",
    icon: SmallParcel,
    date: "24 November, 2023",
    from: "Locker B13, 81 Le Van Sy, HCMC",
    to: "International Univeersity",
    backgroundColor: "#FD8979",
    textColor: "#C7250F",
    receiver: "Nguyen Van D",
    totalPayment: "400000",
    timeToComplete: "12:00 PM"
  }
];

const OrderHistory = () => {
  const { setInputFocused } = useContext(SearchOrderHistoryContext);
  const [searchQuery, setSearchQuery] = useState("");

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [selectedParcel, setSelectedParcel] = useState<ParcelType>();

  const renderParcelItem = ({ item }: { item: ParcelType }) => {
    return (
      <View className="flex-1 flex-col p-3 gap-2 pt-0 mb-1">
        <View className="h-[2px] w-full bg-slate-300 rounded mb-2"></View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-[16px] text-[#808080]">Total Payment:</Text>
            <Text className="text-[17px] font-medium ml-2">{item?.totalPayment} VND</Text>
          </View>
          <View>
            <Text className="text-[16px] text-[#808080]">Completed date:</Text>
            <Text className="text-[17px] font-medium ml-2">{item?.date}</Text>
          </View>
        </View>

        <View className="h-[2px] w-full bg-slate-300 rounded mb-2"></View>

        <View className="flex-row items-start">
          <View className="items-center mr-[10px] mt-1">
            <View className="w-[10px] h-[10px] rounded-[5px] bg-[#213E60]"></View>
            <View className="w-[2px] h-[53px] bg-[#213E60]"></View>
            <View className="w-[10px] h-[10px] rounded-[5px] bg-[#213E60] mb-[4px]"></View>
          </View>
          <View className="flex-1 gap-4">
            <View>
              <Text className="text-[16px] text-[#808080]">From</Text>
              <Text className="text-[17px] font-medium ml-2">{item?.to}</Text>
            </View>

            <View>
              <Text className="text-[16px] text-[#808080]">To</Text>
              <Text className="text-[17px] font-medium ml-2">{item?.from}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const filteredParcels = useMemo(() => {
    return Parcel.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearchQuery =
        item.id.toString().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower) ||
        item.date.toLowerCase().includes(searchLower) ||
        item.to.toLowerCase().includes(searchLower);
      return matchesSearchQuery;
    });
  }, [Parcel, searchQuery]);

  return (
    <View className="flex-1 flex-col justify-between">
      <Header title={"Order History"} />

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

      <View className="flex-1 flex-col justify-between">
        <ScrollView>
          {filteredParcels.map((item, index) => {
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
                    keyExtractor={(selectedParcel) => selectedParcel?.id.toString() || ""}
                    renderItem={renderParcelItem}
                    className="p-5"
                    contentContainerStyle={{ paddingBottom: 8 }}
                    ListHeaderComponent={
                      <View className="mb-3">
                        <Text className="text-[#213E60] font-medium text-[25px]">Order #{selectedParcel?.id}</Text>
                      </View>
                    }
                    ListFooterComponent={() => (
                      <TouchableOpacity
                        onPress={() => {
                          actionSheetRef.current?.hide();
                        }}
                        style={defaultStyles.btn}
                      >
                        <Text style={defaultStyles.btnText}>Back</Text>
                      </TouchableOpacity>
                    )}
                  />
                </ActionSheet>
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
                    <item.icon />
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "mon-sb",
                        color: "#000",
                        paddingLeft: 10
                      }}
                    >
                      {item.name}
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
                  <Text style={styles.parcelSize}>{item.date}</Text>
                  <Text style={styles.parcelSize}>{item.to}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
