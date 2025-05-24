import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  notifications: Notification[];
  sendNotification: (message: string) => void;
  clearNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const sendNotification = (message: string) => {
    if (notificationsEnabled) {
      const id = Date.now(); // Unique ID for each notification
      setNotifications((prev) => [...prev, { id, message }]);
      console.log("Notification:", message);
    }
  };

  const clearNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationsEnabled,
        toggleNotifications,
        notifications,
        sendNotification,
        clearNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
