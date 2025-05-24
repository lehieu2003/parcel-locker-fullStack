/**
 * @interface OrderType
 * Represents the structure of an order.
 * @property {number} order_id - Unique identifier for the order.
 * @property {Object} parcel - Details about the parcel.
 * @property {number} parcel.width - Width of the parcel.
 * @property {number} parcel.length - Length of the parcel.
 * @property {number} parcel.height - Height of the parcel.
 * @property {number} parcel.weight - Weight of the parcel.
 * @property {string} parcel.parcel_size - Size category of the parcel.
 * @property {number} sender_id - Unique identifier for the sender.
 * @property {Object} sender_informations - Information about the sender.
 * @property {string} sender_informations.name - Name of the sender.
 * @property {string} sender_informations.phone - Phone number of the sender.
 * @property {string} sender_informations.address - Address of the sender.
 * @property {Object} recipient_informations - Information about the recipient.
 * @property {string} recipient_informations.name - Name of the recipient.
 * @property {string} recipient_informations.phone - Phone number of the recipient.
 * @property {string} recipient_informations.address - Address of the recipient.
 * @property {number} recipient_id - Unique identifier for the recipient.
 * @property {number} sending_locker - Identifier for the sending locker.
 * @property {number} receiving_locker - Identifier for the receiving locker.
 * @property {string} ordering_date - Date when the order was placed.
 * @property {string | null} [sending_date] - Date when the order was sent (optional).
 * @property {string | null} [receiving_date] - Date when the order was received (optional).
 * @property {string} order_status - Current status of the order.
 * @property {number} totalPayment - Total payment for the order.
 * @property {string} backgroundColor - Background color for the order display.
 * @property {string} textColor - Text color for the order display.
 */

/**
 * @interface OrderHistoryContextType
 * Represents the context type for order history.
 * @property {OrderType[]} orders - List of orders.
 * @property {(newOrders: OrderType[]) => void} addOrders - Function to add new orders.
 */

/**
 * @constant {React.Context<OrderHistoryContextType | undefined>} OrderHistoryContext
 * Context for order history.
 */

/**
 * @component OrderHistoryProvider
 * Provider component for order history context.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} The provider component.
 */

/**
 * @function useOrderHistory
 * Custom hook to use the order history context.
 * @throws Will throw an error if used outside of an OrderHistoryProvider.
 * @returns {OrderHistoryContextType} The order history context value.
 */
import { createContext, useContext, useState } from "react";

interface OrderType {
  order_id: number;
  parcel: {
    width: number;
    length: number;
    height: number;
    weight: number;
    parcel_size: string;
  };
  sender_id: number;
  sender_informations: {
    name: string;
    phone: string;
    address: string;
  };
  recipient_informations: {
    name: string;
    phone: string;
    address: string;
  };
  recipient_id: number;
  sending_locker: number;
  receiving_locker: number;
  ordering_date: string;
  sending_date?: string | null;
  receiving_date?: string | null;
  order_status: string;
  totalPayment: number;
  backgroundColor: string;
  textColor: string;
}

interface OrderHistoryContextType {
  orders: OrderType[];
  addOrders: (newOrders: OrderType[]) => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

// Provider component
export const OrderHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const addOrders = (newOrders: OrderType[]) => {
    setOrders((prevOrders) => {
      const orderIds = new Set(prevOrders.map((order) => order.order_id));
      const filteredNewOrders = newOrders.filter((order) => !orderIds.has(order.order_id)); // Only add new orders
      return [...prevOrders, ...filteredNewOrders];
    });
  };

  return <OrderHistoryContext.Provider value={{ orders, addOrders }}>{children}</OrderHistoryContext.Provider>;
};

// Custom hook for using the context
export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error("useOrderHistory must be used within an OrderHistoryProvider");
  }
  return context;
};
