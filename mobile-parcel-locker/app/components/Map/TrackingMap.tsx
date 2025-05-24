import { OSRM_ENDPOINT, RootStackParamList } from "@/app/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { getDistance } from "geolib";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { useAuth } from "@/app/contexts/AuthContext";

const TrackingMap = ({ route }: { route: any }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const mapRef = useRef<any>(null);
  const { selectedParcel, setSelectedParcel } = route.params;
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [oldOrderLocation, setOldOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [routePath, setRoutePath] = useState<any>(null);

  const orderRegion = {
    latitude: selectedParcel?.sending_address?.latitude,
    longitude: selectedParcel?.sending_address?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  };
  const lockerRegion = {
    latitude: selectedParcel?.receiving_address?.latitude,
    longitude: selectedParcel?.receiving_address?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  };

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

  useEffect(() => {
    const gap = getDistance(
      { latitude: orderLocation?.latitude || 0, longitude: orderLocation?.longitude || 0 },
      { latitude: oldOrderLocation?.latitude || 0, longitude: oldOrderLocation?.longitude || 0 }
    );

    const getRoute = async () => {
      const response = await fetch(
        `${OSRM_ENDPOINT}route/v1/driving/${selectedParcel?.sending_address?.longitude},${selectedParcel?.sending_address?.latitude};${selectedParcel?.receiving_address?.longitude},${selectedParcel?.receiving_address?.latitude}?overview=full&geometries=geojson&steps=true`
      );
      const data = await response.json();

      if (data?.routes?.length > 0) {
        setRoutePath(
          data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({ latitude: lat, longitude: lng }))
        );
      }
    };

    if (oldOrderLocation == null || orderLocation == null || gap > 5) {
      getRoute();
    }
  }, [orderLocation, oldOrderLocation]);

  const handleOnClose = () => {
    setShowInfo(false);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const onLocateMe = () => {
    if (selectedParcel?.sending_address) {
      const region = {
        latitude: selectedParcel?.sending_address?.latitude,
        longitude: selectedParcel?.sending_address?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      mapRef.current?.animateToRegion(region, 1000);
    }
  };

  const handleBackPress = () => {
    setSelectedParcel(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "bottomNavigator/Home" }]
    });
  };

  const getStepStyle = (status: string, step: string) => {
    return status === step ? styles.activeStep : styles.step;
  };

  const getStepTextStyle = (status: string, step: string) => {
    return status === step ? styles.activeStepText : styles.stepText;
  };

  const getStepIndicatorStyle = (status: string, step: string) => {
    return status === step ? styles.activeStepIndicator : styles.stepIndicator;
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={orderRegion} showsUserLocation={true}>
        {orderRegion && (
          <Marker
            coordinate={orderRegion}
            title={selectedParcel?.sending_address?.addressName || "Sender"}
            pinColor="orange"
          />
        )}
        {routePath?.length > 0 && <Polyline coordinates={routePath} strokeColor="#FF8A00" strokeWidth={4} />}
        {lockerRegion && (
          <Marker
            coordinate={lockerRegion}
            title={selectedParcel?.receiving_address?.addressName || "Receiver"}
            pinColor="blue"
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.locateBtn2} onPress={onLocateMe}>
        <Ionicons name="navigate" size={24} />
      </TouchableOpacity>

      {!showInfo && (
        <TouchableOpacity style={styles.showInfoButton} onPress={handleShowInfo}>
          <Text style={styles.showInfoButtonText}>Show Info</Text>
        </TouchableOpacity>
      )}

      {showInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedParcel?.order_status}</Text>
            {/* <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={18} color="#213E60" />
              <Text style={styles.timeText}>10 Min</Text>
            </View> */}
          </View>

          <View style={styles.stepContainer}>
            <TouchableOpacity style={getStepStyle(selectedParcel.order_status, "Packaging")}>
              <Text style={getStepTextStyle(selectedParcel.order_status, "Packaging")}>Packaging</Text>
              <View style={getStepIndicatorStyle(selectedParcel.order_status, "Packaging")} />
            </TouchableOpacity>
            <TouchableOpacity style={getStepStyle(selectedParcel.order_status, "Waiting")}>
              <Text style={getStepTextStyle(selectedParcel.order_status, "Waiting")}>Waiting</Text>
              <View style={getStepIndicatorStyle(selectedParcel.order_status, "Waiting")} />
            </TouchableOpacity>

            <TouchableOpacity style={getStepStyle(selectedParcel.order_status, "Ongoing")}>
              <Text style={getStepTextStyle(selectedParcel.order_status, "Ongoing")}>Ongoing</Text>
              <View style={getStepIndicatorStyle(selectedParcel.order_status, "Ongoing")} />
            </TouchableOpacity>
            <TouchableOpacity style={getStepStyle(selectedParcel.order_status, "Delivered")}>
              <Text style={getStepTextStyle(selectedParcel.order_status, "Delivered")}>Delivered</Text>
              <View style={getStepIndicatorStyle(selectedParcel.order_status, "Delivered")} />
            </TouchableOpacity>
            <TouchableOpacity style={getStepStyle(selectedParcel.order_status, "Completed")}>
              <Text style={getStepTextStyle(selectedParcel.order_status, "Completed")}>Completed</Text>
              <View style={getStepIndicatorStyle(selectedParcel.order_status, "Completed")} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.locationPoint}>
              <Ionicons name="location-outline" size={24} color="orange" />
              <View className="flex flex-col px-2">
                <Text style={styles.locationText}>Locker A</Text>
                <Text style={styles.locationSubText}>{selectedParcel?.sending_address?.addressName}</Text>
              </View>
            </View>

            <View style={styles.locationSeparator} />

            <View style={styles.locationPoint}>
              <Ionicons name="location-outline" size={24} color="blue" />
              <View className="flex flex-col px-2">
                <Text style={styles.locationText}>Locker B</Text>
                <Text style={styles.locationSubText}>{selectedParcel?.receiving_address?.addressName}</Text>
              </View>
            </View>
          </View>

          <ButtonComponent
            text="Close"
            onPress={handleOnClose}
            width={300}
            alignSelf="center"
            backgroundColor="#FF8A00"
            marginTop={20}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  showInfoButton: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#FF8A00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  showInfoButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 10
  },
  timeText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#213E60"
  },
  stepContainer: {
    flexDirection: "row",
    marginVertical: 10
  },
  activeStep: {
    flex: 1,
    alignItems: "center"
  },
  activeStepText: {
    fontSize: 12,
    color: "#FF8A00",
    fontWeight: "bold"
  },
  activeStepIndicator: {
    height: 2,
    width: "100%",
    backgroundColor: "#FF8A00",
    marginTop: 4
  },
  step: {
    flex: 1,
    alignItems: "center"
  },
  stepText: {
    fontSize: 12,
    color: "gray"
  },
  stepIndicator: {
    height: 2,
    width: "100%",
    backgroundColor: "lightgray",
    marginTop: 4
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  locationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 10
  },
  locationPoint: {
    flexDirection: "row",
    marginBottom: 10
  },
  locationCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#213E60",
    marginRight: 10
  },
  locationSeparator: {
    position: "absolute",
    top: 27,
    left: 11,
    borderLeftWidth: 2,
    borderLeftColor: "#ccc",
    height: 52
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  locationSubText: {
    color: "gray",
    flexShrink: 2
  },
  locateBtn2: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 5
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 5
  }
});

export default TrackingMap;
