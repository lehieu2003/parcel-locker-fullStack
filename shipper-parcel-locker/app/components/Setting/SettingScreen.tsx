import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Header from "@/app/components/Header/Header";
import { useNavigation } from "expo-router";
import { useAuth } from "@/app/contexts/AuthContext";

const SettingScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [isPushNotificationEnabled, setPushNotificationEnabled] = useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);

  const togglePushNotification = () => setPushNotificationEnabled(!isPushNotificationEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!isDarkModeEnabled);

  const handleLogout = async () => {
    await signOut();
    navigation.navigate("components/Auth/LoginScreen" as never);
  };

  return (
    <ScrollView>
      <Header title="Settings" />
      <View className="p-5 flex-col gap-3">
        <View>
          <Text style={styles.settingsTitle}>Account</Text>
          <TouchableWithoutFeedback
            className="rounded-t-md justify-between"
            style={styles.settingsTile}
            onPress={() => navigation.navigate("editprofile" as never)}
          >
            <Text style={styles.settingsText}>Edit Profile</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            className="justify-between"
            style={styles.settingsTile}
            onPress={() => navigation.navigate("changePassword" as never)}
          >
            <Text style={styles.settingsText}>Change Password</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback className="justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Add a Payment Method</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <View style={styles.settingsTile}>
            <Text style={styles.settingsText}>Push Notification</Text>
            <Switch onValueChange={togglePushNotification} value={isPushNotificationEnabled} />
          </View>

          <View style={[styles.settingsTile, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingsText}>Dark Mode</Text>
            <Switch onValueChange={toggleDarkMode} value={isDarkModeEnabled} />
          </View>
        </View>

        <View>
          <Text style={styles.settingsTitle}>Cache & Cellular</Text>
          <TouchableWithoutFeedback
            className="rounded-t-md justify-between"
            style={styles.settingsTile}
            onPress={() => navigation.navigate("statics" as never)}
          >
            <Text style={styles.settingsText}>Statistics</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback className="justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Achievement</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Text style={styles.settingsTitle}>Support & About</Text>
          <TouchableWithoutFeedback className="rounded-t-md justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Privacy</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback className="justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Terms and Policies</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Text style={styles.settingsTitle}>Actions</Text>
          <TouchableWithoutFeedback className="rounded-t-md justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Report a Problem</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback className="justify-between" style={styles.settingsTile}>
            <Text style={styles.settingsText}>Add Account</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            className="rounded-b-md justify-between"
            style={styles.settingsTile}
            onPress={handleLogout}
          >
            <Text style={styles.settingsText}>Log out</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsTitle: {
    fontWeight: "bold",
    fontFamily: "mon-b",
    fontSize: 16,
    marginBottom: 5,
    color: "gray"
  },
  settingsView: { flex: 1, width: "100%", height: "100%" },
  settingsTile: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e0e0e0",
    borderBottomWidth: 1
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "regular"
  },
  arrow: {
    fontSize: 20,
    color: "black"
  }
});

export default SettingScreen;
