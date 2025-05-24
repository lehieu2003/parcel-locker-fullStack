import React, { useState } from "react";
import { View, Text } from "react-native";
import Header from "../components/Header/Header";

interface NotificationProps {
  title: string;
  id: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  return (
    <View>
      <Header title="Notification" />
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        {notifications.length === 0 ? (
          <Text style={{ fontSize: 16, color: "gray", textAlign: "center" }}>No notifications available</Text>
        ) : (
          notifications.map((notification) => (
            <View
              key={notification.id}
              style={{
                flexDirection: "row",
                marginBottom: 5,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "medium", color: "black" }}>{notification.title}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Notification;
