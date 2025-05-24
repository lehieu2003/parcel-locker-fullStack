import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import UserList from "./components/pages/user/userList";
import OrderDetail from "./components/pages/order/orderDetail";
import OrderList from "./components/pages/order/orderList";
import LockerList from "./components/pages/locker/lockerList";
import LockerDetail from "./components/pages/locker/lockerDetail";
// import ParcelList from "./components/pages/parcel/parcelList";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import ForgotPassword from "./components/auth/forgotPassword";
import OtpVerification from "./components/auth/otpVerification";
import ResetPassword from "./components/auth/resetPassword";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { UserProvider } from "./components/contexts/userContext";
import ShipperList from "./components/pages/shipper/shipperList";
import ControlPanel from "./components/pages/control/ControlPanel";

const App: React.FC = () => {
	const isAuthenticated = useIsAuthenticated();

	return (
		<>
			{isAuthenticated ? (
				<Router>
					<UserProvider>
						<Layout>
							<Routes>
								<Route path="/" element={<UserList />} />
								<Route path="/userlist" element={<UserList />} />
								<Route path="/shipperlist" element={<ShipperList />} />
								<Route path="/orderlist" element={<OrderList />} />
								<Route path="/orderdetail" element={<OrderDetail />} />
								<Route path="/lockerlist" element={<LockerList />} />
								<Route path="/lockerdetail" element={<LockerDetail />} />
								<Route path="/controlpanel" element={<ControlPanel />} />
								{/* <Route path="/parcellist" element={<ParcelList />} /> */}
							</Routes>
						</Layout>
					</UserProvider>
				</Router>
			) : (
				<Router>
					<UserProvider>
						<Routes>
							<Route path="/register" element={<Register />} />
							<Route path="/forgot" element={<ForgotPassword />} />
							<Route path="/otpVerification" element={<OtpVerification />} />
							<Route path="/resetPassword" element={<ResetPassword />} />
							<Route path="/*" element={<Login />} />
						</Routes>
					</UserProvider>
				</Router>
			)}
		</>
	);
};

export default App;
