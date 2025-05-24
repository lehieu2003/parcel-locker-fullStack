import Constants from "expo-constants";
export const API_ENDPOINT = Constants.expoConfig?.extra?.API_URL ?? "https://api.captechvn.com/api/v1/";
export const MAP_ENDPOINT = Constants.expoConfig?.extra?.MAP_URL ?? "https://nominatim.openstreetmap.org/";
export const OSRM_ENDPOINT = Constants.expoConfig?.extra?.OSRM_URL ?? "https://router.project-osrm.org/";

export type RootStackParamList = {
  "navigators/DrawerNavigator": undefined;
  "navigators/TabNavigator": undefined;
  "components/Auth/LoginScreen": undefined;
  "navigators/HomeNavigator": undefined;
  "bottomNavigator/Home": undefined;
  "navigators/OrderHistory": undefined;
  "navigators/SendNavigator": undefined;
  "components/ScanQR/ScanQR": undefined;
  "navigators/NotificationNavigator": undefined;
  "navigators/SettingNavigator": undefined;
  "components/Splash/Splash": undefined;
  "components/Splash/Onboarding": undefined;
  "components/Splash/OnboardingScreen": undefined;
  "components/Auth/SignUpScreen": undefined;
  "components/Auth/ConfirmEmail": undefined;
  "components/Auth/RegisterByCode": undefined;
  "components/Auth/ForgotPassword": undefined;
  "components/Auth/ResetPassword": undefined;
  "components/Auth/OtpVerification": undefined;
  "components/LiveTracking/[id]": { selectedParcel: OrderType };
  "components/OrderHistory/OrderHistory": undefined;
  "components/FindLocker/FindLocker": undefined;
  "components/Map/TrackingMap": { selectedParcel: OrderType; orderId: number; setSelectedParcel: any };
};

export const statusOrder: any = {
  Packaging: 0,
  Waiting: 1,
  Ongoing: 2,
  Delivered: 3,
  Completed: 4
};

export type TrackOrderType = {
  order_id: number;
  parcel: {
    width: number;
    length: number;
    height: number;
    weight: number;
    parcel_size: string;
  };
  sender_id: number;
  sender_information: {
    name: string;
    phone: string;
    address: string;
  };
  recipient_id: number;
  sending_address: string;
  sending_locker: string;
  receiving_address: string;
  receiving_locker: string;
  ordering_date: string;
  sending_date?: string | null;
  receiving_date?: string | null;
  order_status: string;
  totalPayment?: number;
  backgroundColor: string;
  textColor: string;
};

export type OrderType = {
  order_id: number;
  parcel: {
    width: number;
    length: number;
    height: number;
    weight: number;
    parcel_size: string;
  };
  sender_id: number;
  sender_information: {
    name: string;
    phone: string;
    address: string;
  };
  recipient_id: number;
  sending_address: {
    addressName: string;
    longitude: number;
    latitude: number;
  };
  sending_locker: string;
  receiving_address: {
    addressName: string;
    longitude: number;
    latitude: number;
  };
  receiving_locker: string;
  ordering_date: string;
  sending_date?: string | null;
  receiving_date?: string | null;
  order_status: string;
  totalPayment?: number;
  backgroundColor?: string;
  textColor?: string;
};

export const sendingTypes = [
  {
    type: "locker to locker",
    textFrom: "Locker",
    textTo: "Locker",
    iconFrom: require("../../assets/images/locker.png"),
    iconTo: require("../../assets/images/locker.png"),
    home: false
  },
  {
    type: "locker to home",
    textFrom: "Locker",
    textTo: "Home",
    iconFrom: require("../../assets/images/locker.png"),
    iconTo: require("../../assets/images/home.png"),
    home: true
  }
];

export const packagingTypeList = [
  {
    type: "digital-product",
    text: "Digital Product"
  },
  {
    type: "food",
    text: "Food"
  },
  {
    type: "clothing",
    text: "Clothing"
  },
  {
    type: "valuable",
    text: "Valuable"
  },
  {
    type: "document",
    text: "Document"
  },
  {
    type: "inflamable-explosive",
    text: "Inflamable/Explosive"
  },
  {
    type: "others",
    text: "Others"
  }
];
