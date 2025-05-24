import ListingsMap from "@/app/components/Map/ListingMap";
import { defaultStyles } from "@/app/constants/Styles";
import { Context } from "@/app/contexts/ParcelContext";
import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Stepper from "./Stepper";
import * as SecureStore from "expo-secure-store";

const Page = ({ navigation }: any) => {
  const [senderAddress, setsenderAddress] = useState<string>("");
  const [lockerId, setLockerId] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(3);
  const [getoItems, setGetoItems] = useState<
    { locker_id: number; address: string; latitude: number; longitude: number }[]
  >([]);
  const parcelContext = useContext(Context);

  const onNext = () => {
    parcelContext.setSenderInfo({
      ...parcelContext.senderInfo,
      senderAddress: senderAddress,
      lockerId: lockerId
    });
    navigation.navigate("Send/PeopleDetail");
  };

  useMemo(() => {
    const fetchLockers = async () => {
      try {
        const lockers = await SecureStore.getItemAsync("lockers");
        if (lockers) {
          setGetoItems(JSON.parse(lockers));
        }
      } catch (error) {
        console.error("Error fetching lockers data:", error);
        setGetoItems([]);
      }
    };
    fetchLockers();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column"
        }}
      ></View>
      <ListingsMap
        listings={getoItems}
        setAddress={setsenderAddress}
        setLockerId={setLockerId}
        lockerId={lockerId}
        home={false}
      />
      {senderAddress && lockerId ? (
        <View style={styles.footer}>
          <Stepper currentStep={currentStep} />

          <View style={{ flexDirection: "column", gap: 4 }}>
            <View style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 16, fontFamily: "mon-b" }}>Sender's locations</Text>
              <Text style={{ fontSize: 16, fontFamily: "mon" }}>{senderAddress}</Text>
            </View>
            <TouchableOpacity onPress={onNext} style={defaultStyles.btn}>
              <Text style={defaultStyles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.footer}>
          <Stepper currentStep={currentStep} />

          <View style={{ flexDirection: "column", gap: 4 }}>
            <View style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 16, fontFamily: "mon-b" }}>Sender's locations</Text>
              <Text style={{ fontSize: 16, fontFamily: "mon" }}>{senderAddress}</Text>
            </View>
            <TouchableOpacity style={[defaultStyles.btn, { opacity: 0.5 }]}>
              <Text style={defaultStyles.btnText}>Please choose your locker</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white"
  },
  title: {
    fontSize: 15,
    fontFamily: "mon-sb",
    color: "#000",
    alignSelf: "flex-start"
  },
  detail: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  footer: {
    position: "absolute",
    height: 150,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  icon: {
    backgroundColor: "#ffc902",
    padding: 8,
    borderRadius: 10
  },
  deliverParcel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff"
  },
  fieldsetLegend: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: "white",
    position: "absolute",
    top: -12,
    color: "#9b9c9d"
  }
});
