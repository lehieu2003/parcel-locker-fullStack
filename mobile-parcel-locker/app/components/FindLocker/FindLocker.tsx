import Header from "@/app/Header/HeaderGoBack";
import { InformationIcon } from "@/assets/images/Icon";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import DetailLocker from "./DetailLocker";
import * as SecureStore from "expo-secure-store";

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const FindLockerScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" }
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: "flex" }
        });
      };
    }, [navigation])
  );
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedLocker, setSelectedLocker] = useState<any>(null);
  const [lockers, setLockers] = useState<any>([]);

  useMemo(() => {
    const fetchLockers = async () => {
      try {
        const lockers = await SecureStore.getItemAsync("lockers");
        if (lockers) {
          setLockers(JSON.parse(lockers));
        }
      } catch (error) {
        console.error("Error fetching lockers data:", error);
        setLockers([]);
      }
    };
    fetchLockers();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  if (errorMsg) {
    Alert.alert("Location Error", errorMsg);
  }

  const filteredLockers = lockers
    .map((locker: any) => {
      const distance = location
        ? calculateDistance(location.latitude, location.longitude, locker?.latitude, locker?.longitude)
        : null;
      return { ...locker, distance };
    })
    .filter((locker: any) => locker?.address.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0)); // Sort by distance

  const handleOnpressLocker = (id: number, distance: number | null) => {
    const locker = lockers.find((item: any) => item?.locker_id === id);
    setSelectedLocker({ ...locker, distance });
    actionSheetRef.current?.show();
  };

  return (
    <View className="flex-1">
      <Header title="Find Locker" />

      <TouchableOpacity style={styles.searchBar}>
        <Icon name="search" size={20} color="grey" />
        <TextInput
          style={{ marginLeft: 5, width: 280 }}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Find a Locker"
        />
      </TouchableOpacity>

      <MapView
        className="flex-1"
        initialRegion={{
          latitude: location?.latitude || 10.8231,
          longitude: location?.longitude || 106.6297,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2
        }}
      >
        {filteredLockers.map((locker: any) => (
          <Marker
            key={locker?.locker_id}
            coordinate={{ latitude: locker?.latitude, longitude: locker?.longitude }}
            title={locker?.address}
          />
        ))}
      </MapView>

      <Text className="text-[16px] font-bold p-2 text-[#213E60]">Nearby Lockers</Text>

      <View className="h-[150px] px-[10px]">
        <ScrollView>
          {filteredLockers.map((locker: any) => (
            <TouchableOpacity
              key={locker?.locker_id}
              className="flex-row justify-between items-center p-2"
              onPress={() => handleOnpressLocker(locker?.locker_id, locker?.distance)}
            >
              <View className="flex-col w-4/5">
                <Text className="text-[14px] font-bold">{locker?.address}</Text>
                <Text className="text-[12px] text-[#808080]">
                  {locker?.distance ? `${locker.distance.toFixed(2)} km away` : "Distance not available"}
                </Text>
              </View>

              <InformationIcon />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ActionSheet ref={actionSheetRef} gestureEnabled containerStyle={{ borderRadius: 20 }}>
        {selectedLocker && <DetailLocker selectedLocker={selectedLocker} />}
      </ActionSheet>
    </View>
  );
};

export default FindLockerScreen;

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
  }
});
