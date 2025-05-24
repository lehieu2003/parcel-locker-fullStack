// src/components/Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./navBar";
import Sidebar from "./sideBar";
import { SidebarItem } from "./sidebarItem";
import User from "@mui/icons-material/PersonRounded";
import Order from "@mui/icons-material/ShoppingCartRounded";
import Locker from "@mui/icons-material/ViewQuiltRounded";
import { ControlPoint } from "@mui/icons-material";
// import Parcel from "@mui/icons-material/Inventory2Rounded";
interface LayoutProps {
  children: ReactNode;
}

const items: SidebarItem[] = [
  {
    icon: <User fontSize="large" />,
    name: "User",
    link: "userlist",
    children: [
      { name: "User list", link: "userlist" },
      { name: "Shipper list", link: "shipperlist" },
    ],
  },
  {
    icon: <Order fontSize="large" />,
    name: "Order",
    link: "orderlist",
    children: [
      { name: "List of orders", link: "orderlist" },
      { name: "Order details", link: "orderdetail" },
    ],
  },
  {
    icon: <Locker fontSize="large" />,
    name: "Locker",
    link: "lockerlist",
    children: [
      { name: "List of locker", link: "lockerlist" },
      { name: "Locker details", link: "lockerdetail" },
    ],
  },
  {
    icon: <ControlPoint fontSize="large" />,
    name: "Control Panel",
    link: "controlpanel",

  },
  // {
  //   icon: <Parcel fontSize="large" />,
  //   name: "Parcel",
  //   link: "parcellist",
  //   children: [{ name: "List of Parcel", link: "parcellist" }],
  // },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar items={items} />
      <div className="flex flex-col flex-grow max-h-screen ">
        <Navbar />
        <main className="flex-grow p-4 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
