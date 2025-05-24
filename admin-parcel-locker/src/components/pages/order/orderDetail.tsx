import  { useState } from "react";
import { TextField, Button} from "@mui/material";
import OrderService from "../../../services/OrderService";
import { Parcel } from "../../../models/parcel";
import UserService from "../../../services/UserService";
import { OrderStatus, senderInformation } from "../../../models/order";

const OrderDetail = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	// const [currentPage, setCurrentPage] = useState<number>(1);
	// const [isFilterParcelOpen, setIsFilterParcelOpen] = useState<boolean>(false);
	// const [isFilterChange, setIsFilterChange] = useState<boolean>(false);
	// const [filter, setFilter] = useState({});
	const [errorMessage, setErrorMessage] = useState<string>("");

	const [order, setOrder] = useState({
		sending_address: '',
		receiving_address: '',
        ordering_date: '',
        sending_date: '',
        receiving_date: '',
        order_status: '' as unknown as OrderStatus,
        order_id: 0,
        sender_id: 0,
        sender_information: {} as senderInformation,
        recipient_id: 0,
        parcel: {} as Parcel,
	});

	// const handlePageChange = (page: number) => {
	// 	setCurrentPage(page);
	// };

	const handleSearch = async () => {
		setErrorMessage("");
		setOrder({
			sending_address: '',
			receiving_address: '',
			ordering_date: '',
			sending_date: '',
			receiving_date: '',
			order_status: '' as unknown as OrderStatus,
			order_id: 0,
			sender_id: 0,
			sender_information: {} as senderInformation,
			recipient_id: 0,
			parcel: {} as Parcel,
		});
		try {
			const orderRes = await OrderService.getOrder(searchQuery);

			// Check if orderRes is valid and has data
			if (orderRes && orderRes.length > 0) {
				const fetchedOrder = orderRes[0];
				setOrder(fetchedOrder);

				// Fetch sender data if applicable
				if (fetchedOrder.sender_id && fetchedOrder.sender_id !== 1) {
					const senderData = await UserService.get(fetchedOrder.sender_id);
					setOrder((prev) => ({
						...prev,
						sender_data: senderData[0],
					}));
				}
				// Fetch recipient data if applicable
				if (fetchedOrder.recipient_id && fetchedOrder.recipient_id !== 1) {
					const recipientData = await UserService.get(fetchedOrder.recipient_id);
					setOrder((prev) => ({
						...prev,
						recipient_data: recipientData[0],
					}));
				}
			} else {
				setErrorMessage("Order not found. Please check the order ID.");
			}
		} catch (error: any) {
			console.log(error);
			setErrorMessage("System error. Please try again later.");
		}
	};
	// const handleCheckboxChange = (parcelId: string) => {
	// 	const selectedIndex = selectedParcels.indexOf(parcelId);
	// 	let newSelected: string[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = [...selectedParcels, parcelId];
	// 	} else {
	// 		newSelected = selectedParcels.filter((id) => id !== parcelId);
	// 	}

	// 	setSelectedParcels(newSelected);
	// };

	// const handleFilterParcel = (criteria: any) => {
	// 	setFilter(criteria);
	// 	setIsFilterChange((prev) => !prev);
	// 	setIsFilterParcelOpen(false);
	// };

	// const handleResetFilter = () => {
	// 	setSearchQuery("");
	// 	setFilter({});
	// 	setIsFilterChange((prev) => !prev);
	// };

	// const filteredParcels = React.useMemo(() => {
	// 	const normalizedQuery = searchQuery.toLowerCase();
	// 	const searched = order.parcels.filter((parcel) => {
	// 		return (
	// 			parcel.id.toLowerCase().includes(normalizedQuery) ||
	// 			parcel.type.toLowerCase().includes(normalizedQuery) ||
	// 			parcel.size.toLowerCase().includes(normalizedQuery) ||
	// 			parcel.weight.toLowerCase().includes(normalizedQuery) ||
	// 			parcel.status.toLowerCase() === normalizedQuery
	// 		);
	// 	});

	// 	const filtered = searched.filter((parcel) => {
	// 		return Object.keys(filter).every((key) => {
	// 			if (filter[key] === "") {
	// 				return true;
	// 			} else {
	// 				return (
	// 					parcel[key].toString().toLowerCase() === filter[key].toLowerCase()
	// 				);
	// 			}
	// 		});
	// 	});

	// 	return filtered;
	// }, [searchQuery, order.parcels, isFilterChange]);

	// const handleEditParcel = (updatedParcel: any) => {
	// 	const updatedParcels = order?.parcels.map((parcel) => {
	// 		if (parcel.id === updatedParcel.id) {
	// 			return { ...parcel, ...updatedParcel };
	// 		}
	// 		return parcel;
	// 	});

	// 	setOrder((prevOrder) => ({
	// 		...prevOrder,
	// 		parcels: updatedParcels,
	// 	}));
	// };

	// const totalPages = Math.ceil(filteredParcels.length / parcelsPerPage);

	return (
		<div className="container mx-auto p-4 max-h-0">
			<div className="flex flex-col mb-4">
				<div className="mb-3">
					<div className="flex flex-row gap-1">
						<h1 className="text-2xl font-bold">Order &gt; </h1>
						<h1
							className="text-2xl font-bold"
							style={{
								color: "#FF8A00",
							}}
						>
							Order detail
						</h1>
					</div>
					<div
						style={{
							backgroundColor: "#F24E1E",
							height: 1,
							width: 260,
						}}
					/>
				</div>
				<div className="flex flex-row gap-10 mb-4 p-2 items-start space-y-2 sm:space-y-0 sm:space-x-2">
					<h2 className="font-bold self-center">Order ID</h2>
					<TextField
						variant="outlined"
						size="small"
						placeholder="Enter order ID"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="flex flex-row gap-5">
						<Button
							style={{
								borderRadius: 12,
								backgroundColor: "#FF8A00",
								color: "black",
								fontWeight: "bold"
							
							}}
							onClick={() => {
								if (searchQuery.trim() === "") {
									alert("Please enter an order ID.");
								} else {
									handleSearch();
								}
							}}
						>
							Search
						</Button>
					</div>
				</div>

				{errorMessage && (
					<div className="text-red-500 mb-4">{errorMessage}</div>
				)}{order && (
					<div className="flex flex-col gap-0.5">
						<div className="flex flex-row bg-[#D9D9D9] rounded-tl-xl rounded-tr-xl gap-40 px-10 py-3">
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Order ID:</div>
								<div>{order.order_id}</div>
							</div>
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Status:</div>
								<div>{order.order_status}</div>
							</div>
						</div>
						<div className="flex flex-row bg-[#D9D9D9] gap-2 px-20 py-3">
							<div className="font-bold">Customer name:</div>
							<div>{order.sender_information.name}</div>
						</div>
						<div className="flex flex-row bg-[#D9D9D9] gap-10 px-10 py-3">
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Address:</div>
								<div>{order.sender_information.address}</div>
							</div>
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Phone number:</div>
								<div>{order.sender_information.phone}</div>
							</div>
						</div>

						<div className="flex flex-row bg-[#D9D9D9] gap-5 px-10 py-3">
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Sender Address:</div>
								<div>{order.sending_address}</div>
							</div>
							<div className="flex flex-row gap-2 px-10">
								<div className="font-bold">Receiver Address:</div>
								<div>{order.receiving_address}</div>
							</div>
						</div>

						<div className="flex flex-row bg-[#D9D9D9] rounded-bl-xl rounded-br-xl gap-28 px-10">
							<div className="flex flex-row gap-2 px-10 py-3">
								<div className="font-bold">Order date:</div>
								<div>{order.ordering_date ?  order.ordering_date.toString() : ''}</div>

							</div>
							<div className="flex flex-row gap-2 px-10 py-3">
								<div className="font-bold">Delivery date:</div>
								<div>{order.sending_date ?  order.sending_date.toString() : ''}</div>

							</div>
						</div>
					</div>)}
			</div>
			{/* <div className="flex flex-col mb-4">
				<div className="flex flex-col items-end">
					<div className="flex flex-row gap-4 mb-4">
						<Button
							style={{
								borderRadius: 12,
								backgroundColor: "#FF8A00",
								color: "black",
							}}
							startIcon={<Search />}
							onClick={() => setIsFilterParcelOpen(true)}
						>
							Filter
						</Button>
						<Button
							style={{
								borderRadius: 12,
								backgroundColor: "#D9D9D9",
								color: "black",
							}}
							startIcon={<RxReset />}
							onClick={handleResetFilter}
						>
							Reset filter
						</Button>
					</div> */}
			{/* <div className="flex flex-col m-auto border border-gray-300 rounded-md">
						<div className="grid grid-cols-6 bg-[#D9D9D9]">
							<div className="p-3 text-left font-bold pl-10">ID</div>
							<div className="p-3 text-left font-bold">Type</div>
							<div className="p-3 text-left font-bold">Size</div>
							<div className="p-3 text-left font-bold">Weight</div>
							<div className="p-3 text-left font-bold">Status</div>
						</div> */}
			{/* {filteredParcels
							.slice(
								(currentPage - 1) * parcelsPerPage,
								currentPage * parcelsPerPage,
							)
							.map((parcel) => (
								<div key={parcel.id} className="grid grid-cols-6">
									<div className="p-3 pl-10">{parcel.id}</div>
									<div className="p-3">{parcel.type}</div>
									<div className="p-3">{parcel.size}</div>
									<div className="p-3">{parcel.weight}</div>
									<td className="p-3">
										<span
											className={`px-2 py-1 rounded-md text-xs font-medium ${
												parcel.status === "Ongoing"
													? "bg-green-100 text-green-800 px-5 py-2"
													: parcel.status === "Completed"
														? "bg-yellow-100 text-yellow-800 px-4 py-2"
														: "bg-red-100 text-red-800 px-4 py-2"
											}`}
										>
											{parcel.status}
										</span>
									</td>
								</div>
							))} */}
			{/* </div>
					<div className="flex flex-row justify-end mt-4 gap-2">
						<Button
							variant="outlined"
							startIcon={<ArrowLeft />}
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
						>
							Previous
						</Button>
						<Button
							variant="outlined"
							endIcon={<ArrowRight />}
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							Next
						</Button>
					</div>
				</div>
			</div> */}

			{/* {isFilterParcelOpen && (
				<FilterParcel
					open={isFilterParcelOpen}
					onClose={() => setIsFilterParcelOpen(false)}
					onFilterParcel={handleFilterParcel}
				/>
			)}
			{isEditParcelOpen && (
				<EditParcel
					open={isEditParcelOpen}
					onClose={() => setIsEditParcelOpen(false)}
					selectedParcel={selectedParcel}
					onEditParcel={handleEditParcel}
				/>
			)} */}
		</div>
	);
};

export default OrderDetail;
