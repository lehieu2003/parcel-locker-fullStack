import React, { useEffect, useState, useRef } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BookingRequestModal from "../Modal/BookingRequestModal";
import * as Location from "expo-location";
import HomeHeader from "./HomeHeader";
import click from "../../../assets/Animation/click1.gif";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { useNavigation } from "expo-router";
import { useAuth } from "@/app/contexts/AuthContext";
import { Data, RootStackParamList } from "../../utils/constants";
import { NavigationProp } from "@react-navigation/native";

const SOCKET_URL = "ws://captechvn.com/api/v1/shipper";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncVisible, setSyncVisible] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [newRoute, setNewRoute] = useState<Data | null>(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required to access your current location.");
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });

        const { latitude, longitude } = coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching location data");
        }

        const data = await response.json();
        const locationName = data.display_name;
        setLocation(locationName);
      } catch (error: any) {
        console.error("Error fetching address:", error.message);
        setError("Error fetching address.");
      }
    };

    getLocation();
  }, []);

  const handleStartDelivering = () => {
    setSyncVisible(true);
    setLoading(true);

    // Only connect to the WebSocket if the user has an access token
    if (user?.accessToken) {
      const wsURL = `${SOCKET_URL}`;
      console.log("Connecting to WebSocket:", wsURL);

      ws.current = new WebSocket(wsURL, undefined, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });

      ws.current.onclose = () => {
        console.log("WebSocket closed.");
      };

      ws.current.onopen = () => {
        console.log("WebSocket connected.");
      };

      ws.current.onmessage = (e, ...args) => {
        console.log("WebSocket message:", e, args);
        try {
          const messageData = JSON.parse(e.data);

          if (messageData.type === "new_order" && messageData.data) {
            setNewRoute({
              route_id: messageData.data.route_id,
              locations: messageData.data.locations || []
            });

            console.log("New order received:", messageData.data.locations);
            setModalVisible(true);
          }
        } catch (parseError) {
          console.error("Error parsing WebSocket message:", parseError);
        }
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
    }

    setTimeout(() => {
      ws.current?.close();
      setLoading(false);
      setSyncVisible(false);
    }, 3000);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance((prevState) => !prevState);
  };

  return (
    <View className="flex-1 bg-white">
      <HomeHeader />
      <View className="flex-1 px-5 mt-5">
        <View className="border-[1px] border-[#B5B5B5] rounded-[4px] mb-[16px] p-3">
          <Text className="text-[20px] text-[#213E60] font-bold">Available balance</Text>
          <View className="flex-row gap-4 items-center">
            <Text className="text-[18px]">{showBalance ? "100,000 VND" : "******"}</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Icon name={showBalance ? "eye-slash" : "eye"} size={20} color="#AFAFAF" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-col gap-3 mt-1">
          <Text className="text-[20px] text-[#213E60] font-bold">Your current location</Text>
          <View className="flex-row gap-1 border-[1px] border-[#B5B5B5] rounded-[4px] mb-[16px] p-3">
            <Icon name="map-marker" size={20} color="#213E60"></Icon>
            <Text className="text-[16px]">{location || "Fetching location..."}</Text>
          </View>
        </View>

        <ButtonComponent
          text={loading ? "Loading..." : "Start delivering now"}
          width={180}
          alignSelf="center"
          backgroundColor="#213E60"
          styleText={{ fontSize: 14 }}
          onPress={handleStartDelivering}
        />

        <Image
          source={click}
          resizeMode="contain"
          className="w-[50px] h-[50px] absolute right-4 top-72"
          style={{ transform: [{ rotate: "-45deg" }] }}
        />

        {syncVisible && (
          <View className="absolute bottom-0 left-0 right-0 bg-[#213E60] rounded-t-[8px]">
            <View className="flex-row justify-between">
              <Text className="text-white text-[14px] font-medium text-center p-2">Syncing your location</Text>
              <Image source={require("../../../assets/images/configuring.png")} className="w-10 h-10" />
            </View>
          </View>
        )}

        <BookingRequestModal
          openMap={() => {
            if (newRoute) {
              navigation.navigate("MapView", {
                newRoute: newRoute
              });
            } else {
              console.error("Route is null");
            }
          }}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          newRoute={newRoute}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
