import * as Notifications from "expo-notifications";

export const TriggerNotification = async (success: boolean, data: any) => {
  const content = {
    title: success ? "Order Successful" : "Order Failed",
    body: success ? `Your order has been successfully created.` : `Failed to create order`,
    data: { data }
  };

  await Notifications.scheduleNotificationAsync({
    content,
    trigger: { seconds: 1 }
  });
};
