import { useAuth } from "@/app/contexts/AuthContext";
import { API_ENDPOINT } from "@/app/utils/constants";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, Vibration, View } from "react-native";

const ScanQR = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);

  if (!permission) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center p-2">Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center p-2">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const callVerifyOrderAPI = async (order_id: number, otp: number) => {
    const API_VerifyQR = `${API_ENDPOINT}shipper/pickup/${order_id}?otp=${otp}`;

    try {
      const response = await fetch(API_VerifyQR, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Order Verified");
        navigation.goBack();
        setScanningEnabled(false);
      } else {
        Alert.alert("Verification Failed", result.message || "Error verifying the order.");
        setScanningEnabled(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error verifying the order.";
      Alert.alert("Error", errorMessage);
      setScanningEnabled(true);
    } finally {
      setScanningEnabled(false);
    }
  };

  const onBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (!scanningEnabled) return;

    try {
      Vibration.vibrate();
      setScanningEnabled(false);

      const parsedData = JSON.parse(data);
      console.log("Scanned data", parsedData.order_id, parsedData.otp);

      await callVerifyOrderAPI(parseInt(parsedData.order_id), parseInt(parsedData.otp));
    } catch (error: any) {
      Alert.alert("Error", error.message);
      setScanningEnabled(true);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <CameraView
        className="flex-1"
        facing="back"
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      ></CameraView>
    </View>
  );
};

export default ScanQR;
