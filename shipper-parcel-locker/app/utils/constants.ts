export const API_ENDPOINT = "https://api.captechvn.com/api/v1/";

export interface Order {
  order_id: string;
  size: string;
  weight: string;
  type?: string;
  cellNumber?: string;
  imageUrl?: string;
  status?: string;
}

export interface locationLocker {
  locker_id: number;
  latitude: number;
  longitude: number;
  pickup_orders: Order[];
  dropoff_orders: Order[];
}

export interface Data {
  route_id: number;
  locations: locationLocker[];
}

export type RootStackParamList = {
  MapView: { newRoute: Data };
};
