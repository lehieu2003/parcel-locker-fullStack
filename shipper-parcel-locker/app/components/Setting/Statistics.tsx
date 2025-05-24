import Colors from "@/app/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import GoBack from "./GoBack";

const ratingData: any = [
  {
    name: "5 ",
    value: 30,
    color: "#DE6E6A"
  },
  {
    name: "4 ",
    value: 30,
    color: "#F3C96B"
  },
  {
    name: "3 ",
    value: 20,
    color: "#5971C0"
  },
  {
    name: "2 ",
    value: 10,
    color: "#84BFDB"
  },
  {
    name: "1 ",
    value: 10,
    color: "#9EC97F"
  }
];

const tripData = [
  {
    name: "name",
    status: "Delivered"
  },
  {
    name: "name",
    status: "Delivered"
  },
  {
    name: "name",
    status: "Delivered"
  }
];

const Statistics = () => {
  const [dateSelect, setDateSelect] = useState(getToday());
  //const [dateModal, setDateModal] = React.useState(false);
  const bottomRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ["50%"], []);

  const renderBackdrop = React.useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
    []
  );

  return (
    <View className="flex h-full">
      <GoBack title="Statistics" />

      <View className="flex h-auto justify-start items-center">
        <Pressable className="flex flex-row gap-2" onPress={() => bottomRef.current?.expand()}>
          <Text className="text-lg font-[mon-b]">{dateSelect}</Text>
        </Pressable>
      </View>
      <View className="flex flex-row ">
        <View className="w-1/2 flex items-center border-r-2">
          <Text className="text-xl font-medium text-black/60">Revenue</Text>
          <Text className="font-[mon-sb] text-3xl">10$</Text>
        </View>
        <View className="w-1/2 flex items-center">
          <Text className="text-xl font-medium text-black/60">Delivered</Text>
          <Text className="font-[mon-sb] text-3xl">24</Text>
        </View>
      </View>
      <ScrollView>
        <View className="m-4 p-4 flex bg-[#F8F9F9] border-[#BFBFBF] rounded-lg border-2 items-center">
          <Text className="self-start text-gray-600/50 font-bold">Rating</Text>
          <PieChart
            data={ratingData}
            width={220}
            height={220}
            hasLegend={false}
            chartConfig={{ color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})` }}
            accessor={"value"}
            backgroundColor={"none"}
            center={[50, 0]}
            paddingLeft={"0"} // to ensure the legend is visible
          />
          <View className="p-4 flex flex-col gap-2 w-4/5 justify-center">
            {ratingData.map(
              (
                rating: {
                  color: any;
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  value:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                index: number
              ) => (
                <View key={index} className="flex flex-row items-center justify-evenly w-full mb-1">
                  <View style={{ backgroundColor: rating.color }} className={`w-6 h-4 rounded-lg`}></View>
                  <View className=" border-b-[1px] ml-8 border-[#BFBFBF] justify-between w-full flex flex-row">
                    <View className="flex flex-row items-center">
                      <Text className="text-base">{rating.name}</Text>
                      <AntDesign name="star" size={15} color="#FFD233" />
                    </View>
                    <Text className="font-semibold text-base">{rating.value}%</Text>
                  </View>
                </View>
              )
            )}
          </View>
        </View>
        <View className="m-4 p-4 flex bg-[#F8F9F9] border-[#BFBFBF] rounded-lg border-2 items-center">
          <Text className="self-start text-gray-600/50 font-bold">Trip</Text>
          {tripData.map((trip, index) => (
            <View className="flex flex-row gap-2 w-full justify-around items-center " key={index}>
              <Text className="font-bold text-lg">{trip.name}</Text>
              <Entypo name="dot-single" size={50} color="orange" />
              <Text className="font-bold text-lg text-gray-500">{trip.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomRef}
        style={{ justifyContent: "flex-end" }}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
      >
        <View className="p-5">
          <DatePicker
            options={{
              selectedTextColor: Colors.orange_1,
              mainColor: Colors.orange_3
            }}
            mode="calendar"
            onSelectedChange={(date: any) => {
              setDateSelect(date);
            }}
            selected={dateSelect}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default Statistics;
