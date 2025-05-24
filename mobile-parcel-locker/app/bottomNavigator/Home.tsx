import HomeHeader from "@/app/components/HomePage//HomeHeader";
import LiveTracking from "@/app/components/HomePage/LiveTracking";
import Services from "@/app/components/HomePage/Services";
import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Discount from "../components/HomePage/Discount";
const Home = () => {
  const [category, setCategory] = useState<string>("Pick up");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-[#F4F2EF]">
      <HomeHeader />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ paddingTop: 10, flexDirection: "row", paddingHorizontal: 10 }}>
          <Discount offers="Flexible Offers" percentage="25%" img={require("../../assets/images/Discount1.jpg")} />
          <Discount offers="Movehouse Offers" percentage="25%" img={require("../../assets/images/Discount2.jpg")} />
          <Discount offers="Oversea Offers" percentage="25%" img={require("../../assets/images/Discount3.jpg")} />
        </View>
      </ScrollView>
      <Services onCategoryChanged={onDataChanged} />
      <LiveTracking />
    </ScrollView>
  );
};

export default Home;
