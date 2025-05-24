/**
 * TrackingMap component displays a map with user location and parcel locker locations.
 * It fetches and displays routes between the user's location and the lockers.
 *
 * @component
 * @example
 * return (
 *   <TrackingMap />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Uses `react-native-maps` for map rendering.
 * - Uses `expo-location` for fetching user location.
 * - Uses `expo-router` and `@react-navigation/native` for navigation.
 *
 * @function
 * @name TrackingMap
 *
 * @typedef {Object} Locker
 * @property {number} lockerId - The ID of the locker.
 * @property {Object} location - The geographical location of the locker.
 * @property {number} location.latitude - The latitude of the locker.
 * @property {number} location.longitude - The longitude of the locker.
 * @property {Array} parcels - The parcels stored in the locker.
 *
 * @typedef {Object} Parcel
 * @property {string} id - The ID of the parcel.
 * @property {string} size - The size of the parcel.
 * @property {string} type - The type of the parcel.
 * @property {number} cellNumber - The cell number where the parcel is stored.
 * @property {string} status - The status of the parcel.
 *
 * @typedef {Object} Region
 * @property {number} latitude - The latitude of the region.
 * @property {number} longitude - The longitude of the region.
 * @property {number} latitudeDelta - The latitude delta of the region.
 * @property {number} longitudeDelta - The longitude delta of the region.
 *
 * @typedef {Object} LocationObjectCoords
 * @property {number} latitude - The latitude of the location.
 * @property {number} longitude - The longitude of the location.
 *
 * @typedef {Object} Route
 * @property {Array} coordinates - The coordinates of the route.
 * @property {number} coordinates.latitude - The latitude of the coordinate.
 * @property {number} coordinates.longitude - The longitude of the coordinate.
 *
 * @typedef {Object} RouteResponse
 * @property {Array} routes - The routes returned by the API.
 * @property {Object} routes.geometry - The geometry of the route.
 * @property {Array} routes.geometry.coordinates - The coordinates of the route.
 *
 * @typedef {Object} PermissionResponse
 * @property {string} status - The status of the permission request.
 *
 * @typedef {Object} LocationResponse
 * @property {LocationObjectCoords} coords - The coordinates of the location.
 *
 * @typedef {Object} FetchResponse
 * @property {RouteResponse} json - The JSON response from the fetch request.
 *
 * @typedef {Object} Navigation
 * @property {Function} getParent - Gets the parent navigator.
 * @property {Function} setOptions - Sets the options for the navigator.
 *
 * @typedef {Object} MapRef
 * @property {Function} animateToRegion - Animates the map to a specific region.
 *
 * @typedef {Object} StyleSheet
 * @property {Object} container - The container style.
 * @property {Object} map - The map style.
 * @property {Object} locateBtn - The locate button style.
 *
 * @typedef {Object} Ionicons
 * @property {Function} name - The name of the icon.
 * @property {number} size - The size of the icon.
 * @property {string} color - The color of the icon.
 *
 * @typedef {Object} TouchableOpacity
 * @property {Function} onPress - The function to call when the button is pressed.
 *
 * @typedef {Object} View
 * @property {Object} style - The style of the view.
 *
 * @typedef {Object} Alert
 * @property {Function} alert - The function to call to display an alert.
 *
 * @typedef {Object} Polyline
 * @property {Array} coordinates - The coordinates of the polyline.
 * @property {string} strokeColor - The color of the polyline.
 * @property {number} strokeWidth - The width of the polyline.
 *
 * @typedef {Object} Marker
 * @property {Object} coordinate - The coordinate of the marker.
 * @property {string} title - The title of the marker.
 * @property {string} pinColor - The color of the marker pin.
 *
 * @typedef {Object} MapView
 * @property {Object} ref - The reference to the map view.
 * @property {Object} style - The style of the map view.
 * @property {Region} initialRegion - The initial region of the map view.
 * @property {boolean} showsUserLocation - Whether to show the user's location on the map.
 */
import React, { useRef, useState } from "react";
import { View, Alert, TouchableOpacity, StyleSheet, Text } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import * as Location from "expo-location";
import { defaultStyles } from "@/app/constants/Styles";
import { API_ENDPOINT } from "@/app/utils/constants";
import { useAuth } from "@/app/contexts/AuthContext";
import { Order, locationLocker } from "@/app/utils/constants";
import { SmallParcel, MediumParcel } from "@/assets/images/Icon";

const INITIAL_REGION: Region = {
  latitude: 10.877922,
  longitude: 106.801518,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};

interface LocationObjectCoords {
  latitude: number;
  longitude: number;
}

/**
 * TrackingMap component displays a map with user location and parcel locker locations.
 * It fetches and displays routes between the user's location and the lockers.
 *
 * @returns {JSX.Element} The rendered component.
 */

const TrackingMap = ({ route }: { route: any }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { newRoute } = route.params;
  // const newRoute = {
  //   route_id: 0,
  //   locations: [
  //     {
  //       locker_id: 2,
  //       latitude: 10.870091,
  //       longitude: 106.802794,
  //       pickup_orders: [
  //         {
  //           order_id: "1",
  //           size: "6",
  //           weight: "M"
  //         }
  //       ],
  //       dropoff_orders: []
  //     },
  //     {
  //       locker_id: 1,
  //       latitude: 10.772361,
  //       longitude: 106.659599,
  //       pickup_orders: [],
  //       dropoff_orders: [
  //         {
  //           order_id: "1",
  //           size: "6",
  //           weight: "M"
  //         }
  //       ]
  //     }
  //   ]
  // };
  const mapRef = React.useRef<any>(null);
  const [selectedLocker, setSelectedLocker] = useState<locationLocker | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const actionLockerSheetRef = useRef<ActionSheetRef>(null);
  const actionNextLockerSheetRef = useRef<ActionSheetRef>(null);
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
  const [routes, setRoutes] = useState<any[]>([]);

  const requestLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();
        if (permissionResponse.status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required to access your current location.");
          return null;
        }
      }

      const location =
        (await Location.getLastKnownPositionAsync()) ||
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        }));

      return location ? location.coords : null;
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Unable to fetch your current location. Please try again.");
      return null;
    }
  };

  const fetchRoutesInParallel = async (userLocation: any) => {
    if (newRoute.locations.length < 1) return;

    const routeRequests = [];

    // Bắt đầu từ vị trí hiện tại của shipper đến locker đầu tiên trong route mà shipper cần giao
    const start = userLocation;
    const destination_longitude = newRoute.locations[0].longitude;
    const destination_latitude = newRoute.locations[0].latitude;
    let url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${destination_longitude},${destination_latitude}?overview=simplified&geometries=geojson`;
    routeRequests.push(fetch(url).then((response) => response.json()));

    // Tiếp tục từ địa điểm này đến địa điểm tiếp theo
    for (let i = 0; i < newRoute.locations.length - 1; i++) {
      const start_longitude = newRoute.locations[i].longitude;
      const start_latitude = newRoute.locations[i].latitude;
      const destination_longitude = newRoute.locations[i + 1].longitude;
      const destination_latitude = newRoute.locations[i + 1].latitude;
      url = `https://router.project-osrm.org/route/v1/driving/${start_longitude},${start_latitude};${destination_longitude},${destination_latitude}?overview=simplified&geometries=geojson`;
      routeRequests.push(fetch(url).then((response) => response.json()));
    }

    try {
      const routeResponses = await Promise.all(routeRequests);
      const newRoutes = routeResponses
        .map((data) => {
          if (data?.routes?.length > 0) {
            return data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
              latitude: lat,
              longitude: lng
            }));
          }
          return null;
        })
        .filter((route) => route !== null);

      setRoutes(newRoutes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const getUserLocationAndRoutes = async () => {
        const location = await requestLocation();
        if (location) {
          setUserLocation(location);
          fetchRoutesInParallel(location); // Truyền vị trí hiện tại vào hàm fetchRoutesInParallel
        }
      };

      getUserLocationAndRoutes();

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

  const onLocateMe = async () => {
    const location = await requestLocation();
    if (location) {
      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      setUserLocation(location);
      mapRef.current?.animateToRegion(region, 1000);
      fetchRoutesInParallel(location); // Truyền vị trí hiện tại vào hàm fetchRoutesInParallel
    }
  };

  const handleMarkerPress = (locker: locationLocker) => {
    setSelectedLocker(locker);
    actionLockerSheetRef.current?.show();
  };

  const handleDonePress = () => {
    actionNextLockerSheetRef.current?.show();
    actionLockerSheetRef.current?.hide();
  };

  // hiện tại sẽ là error vì chưa có orderId để generate QR code (all data is used to be hardcoded)
  const navigateToQR = async (order: Order) => {
    try {
      console.log("Navigating to QR code scanner", order);
      setSelectedOrder(order);
      const res = await fetch(`${API_ENDPOINT}shipper/generate_qr?order_id=${order.order_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + user?.accessToken
        }
      });

      if (res.ok) {
        console.log("QR code generated successfully");
        navigation.navigate("ScanQR" as never);
      } else {
        navigation.navigate("ScanQR" as never);

        throw new Error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      Alert.alert("Error", "Failed to generate QR code. Please try again.");
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View key={item.order_id} className="mb-5 rounded-md border-[2px] border-[#B5B5B5] p-2">
      <View className="flex-col">
        <View className="flex flex-row items-center justify-center gap-14">
          <View className="gap-2">
            <Text style={{ fontSize: 17 }}>Package {item.order_id}</Text>
            <Text style={{ fontSize: 16 }}>Size: {item.size}</Text>
            <TouchableOpacity
              onPress={() => navigateToQR(item)}
              className="flex bg-[#213E60] p-2 rounded-md mt-2 w-full m-auto"
            >
              <Text className="text-center text-white font-medium">Scan Qr</Text>
            </TouchableOpacity>
          </View>
          <View className="h-20 w-1 bg-slate-300 rounded"></View>
          <View className="flex-col items-center">
            {/* <Text style={{ fontSize: 16 }}>Size: {item.size}</Text> */}
            {item.weight === "M" ? <SmallParcel width="60" height="60" /> : <MediumParcel />}
            {/* <Text
              style={{
                marginTop: 5,
                padding: 5,
                borderRadius: 4,
                textAlign: "center",
                backgroundColor: item.status === "dropoff" ? "#00b894" : "#fdcb6e",
                color: "#fff"
              }}
            >
              {item.status}
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );

  const renderLockerItem = ({ item }: { item: locationLocker }) => (
    <View className="flex-col mb-5 gap-2">
      <View className="flex-col gap-1 rounded p-4 pt-0 border border-[#00B69B]">
        <View className="flex-row gap-2">
          <View className="w-8 h-8 rounded-full border-2 border-[#00B69B]">
            <Text className="text-[16px] text-[#00B69B] font-bold text-center m-auto">{item.locker_id}</Text>
          </View>

          <View className="p-2 bg-[#BBF2EA] rounded-xl">
            <Text style={{ fontSize: 16, color: "#00B69B", fontWeight: "bold", textAlign: "center" }}>
              Locker Location
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
          <Text style={{ fontSize: 15, flexShrink: 1 }}>hello</Text>
        </View>
      </View>
    </View>
  );

  const renderNextLockerComponent = () => (
    <View className="mb-5">
      <View className="flex-row justify-between">
        <View className="flex-col gap-2 items-center">
          <Text className="text-[18px] font-bold">Total Earnings</Text>
          <Text style={{ fontSize: 16 }}>35$</Text>
        </View>
        <View className="h-10 w-1 bg-black rounded"></View>
        <View className="flex-col gap-2 items-center">
          <Text className="text-[18px] font-bold">Packages</Text>
          <Text style={{ fontSize: 16 }}>2</Text>
        </View>
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-[18px] font-bold">Total Distance: </Text>
        <Text style={{ fontSize: 16 }}>18 km</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION} showsUserLocation={true}>
        {/* Place markers for each locker location */}
        {newRoute.locations.map((locker: locationLocker) => (
          <Marker
            key={locker.locker_id}
            coordinate={{
              latitude: locker.latitude,
              longitude: locker.longitude
            }}
            title={`locker id ${locker.locker_id}`}
            pinColor="orange"
            onPress={() => handleMarkerPress(locker)}
          />
        ))}

        {/* Draw parallel routes */}
        {routes.map((route, index) => (
          <Polyline key={index} coordinates={route} strokeColor="#FF8A00" strokeWidth={4} />
        ))}
      </MapView>

      <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
        <Ionicons name="navigate" size={24} color="black" />
      </TouchableOpacity>
      <ActionSheet ref={actionLockerSheetRef} gestureEnabled>
        <View className="p-5">
          <View className="mb-3">
            <Text className="text-[18px] font-bold">
              Number of packages:{" "}
              {(selectedLocker?.pickup_orders?.length ?? 0) + (selectedLocker?.dropoff_orders?.length ?? 0)}
            </Text>
          </View>
          {selectedLocker?.pickup_orders?.map((order) => renderOrderItem({ item: order }))}
          {selectedLocker?.dropoff_orders?.map((order) => renderOrderItem({ item: order }))}
          <TouchableOpacity onPress={handleDonePress} style={defaultStyles.btn}>
            <Text style={defaultStyles.btnText}> Done</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionNextLockerSheetRef} gestureEnabled>
        <FlatList
          data={route.locations}
          keyExtractor={(item) => item?.locker_id.toString()}
          renderItem={renderLockerItem}
          className="p-5"
          contentContainerStyle={{ paddingBottom: 30 }}
          ListHeaderComponent={renderNextLockerComponent}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => {
                actionLockerSheetRef.current?.hide();
              }}
              style={defaultStyles.btn}
            >
              <Text style={defaultStyles.btnText}>Next Locker</Text>
            </TouchableOpacity>
          )}
        />
      </ActionSheet>
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
  locateBtn: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 5
  }
});

export default TrackingMap;
