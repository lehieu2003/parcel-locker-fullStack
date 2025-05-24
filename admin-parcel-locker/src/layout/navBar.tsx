import React from "react";
import SearchBar from "../components/searchbar/searchBar";
import Noti from "@mui/icons-material/NotificationsRounded";
// import Avatar from "@mui/icons-material/AccountCircleRounded";
import UserMenu from "../components/userMenu/userMenu";
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex items-center justify-between">
      <SearchBar />
      <div className="flex flex-row gap-1">
        <a href="#" className="text-white hover:text-gray-300">
          <Noti />
        </a>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
