import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface DiscountProps {
  offers: string;
  percentage: string;
  img: any;
}

const Discount: React.FC<DiscountProps> = ({ offers, percentage, img }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#213E60",
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
        padding: 10,
        width: 300,
      }}
    >
      <Image
        source={img}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            fontWeight: "bold",
            flexShrink: 1,
          }}
          numberOfLines={1} // Ensures the offer text doesn't overflow
        >
          {offers}
        </Text>
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontWeight: "bold",
            marginTop: 5,
          }}
          numberOfLines={1} // Ensures the percentage text fits
        >
          {percentage}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 100,
            marginTop: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#213E60",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Grab Offer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discount;