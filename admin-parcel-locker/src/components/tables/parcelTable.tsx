// import React, { useEffect, useState } from "react";
// import { Button, Checkbox, IconButton, TextField } from "@mui/material";
// import {
// 	Search,
// 	FilterList,
// 	Delete,
// 	Edit,
// 	ArrowLeft,
// 	ArrowRight,
// } from "@mui/icons-material";
// import { RxReset } from "react-icons/rx";
// import AddParcel from "../pages/parcel/addParcel";
// import EditParcel from "../pages/parcel/editParcel";
// import FilterParcel from "../pages/parcel/filterParcel";
// import { ParcelService } from "../../services/ParcelService";
// import { Parcel } from "../../models/parcel";

// const ParcelTable: React.FC = () => {
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [selectedParcels, setSelectedParcels] = useState<number[]>([]);
// 	const parcelsPerPage = 10;
// 	const [parcels, setParcels] = useState<Parcel[]>();
// 	const [isAddParcelOpen, setIsAddParcelOpen] = useState(false);
// 	const [isFilterParcelOpen, setIsFilterParcelOpen] = useState(false);
// 	const [isEditParcelOpen, setIsEditParcelOpen] = useState(false);
// 	const [isFilterChange, setIsFilterChange] = useState(false);
// 	const [filter, setFilter] = useState<{
// 		[key: string]: string;
// 	}>({});
// 	const [totalPages, setTotalPages] = useState(0);
// 	const [selectedParcel, setSelectedParcel] = useState({});

// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const respond = await ParcelService.getAll(currentPage, parcelsPerPage);
// 				setParcels(respond[0]?.data);
// 				setTotalPages(respond[0]?.total_pages)
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		})();
// 	}, [currentPage]);

// 	const handleSelectAllClick = () => {
// 		if (selectedParcels?.length === parcels?.length) {
// 			setSelectedParcels([]);
// 		} else {
// 			const allParcelIds = parcels?.map((parcel) => parcel.parcel_id);
// 			setSelectedParcels(allParcelIds);
// 		}
// 	};

// 	const handlePageChange = (page: number) => {
// 		setCurrentPage(page);
// 	};

// 	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setSearchQuery(e.target.value);
// 		setCurrentPage(1);
// 	};

// 	const handleCheckboxChange = (parcelId: number) => {
// 		const selectedIndex = selectedParcels?.indexOf(parcelId);
// 		let newSelected: number[] = [];

// 		if (selectedIndex === -1) {
// 			newSelected = [...selectedParcels, parcelId];
// 		} else {
// 			newSelected = selectedParcels?.filter((id) => id !== parcelId);
// 		}

// 		setSelectedParcels(newSelected);
// 	};


// 	const handleAddParcel = (parcel: {
// 		id: string;
// 		type: string;
// 		weight: string;
// 		size: string;
// 		status: string;
// 	}) => {
// 		setParcels([...parcels, parcel]);
// 		setIsAddParcelOpen(false);
// 	};

// 	const handleFilterParcel = (criteria: { [key: string]: string }) => {
// 		setFilter(criteria);
// 		setIsFilterChange((prev) => !prev);
// 		setIsFilterParcelOpen(false);
// 	};

// 	const handleResetFilter = () => {
// 		setSearchQuery("");
// 		setFilter({});
// 		setIsFilterChange((prev) => !prev);
// 	};

// 	const filteredParcels = React.useMemo(() => {
// 		const normalizedQuery = searchQuery.toLowerCase();
// 		const searched = parcels?.filter((parcel) => {
// 			console.log(parcel)
// 			return (
// 				parcel.parcel_id?.toString().toLowerCase().includes(normalizedQuery) ||
// 				parcel.parcel_size?.toLowerCase().includes(normalizedQuery) ||
// 				parcel.weight.toString().includes(normalizedQuery)
// 			);
// 		});

// 		const filtered = searched?.filter(
// 			(parcel: { [key: string]: string | number }) => {
// 				return Object.keys(filter).every((key) => {
// 					if (filter[key] === "") {
// 						return true;
// 					} else {
// 						return (
// 							parcel[key]?.toString().toLowerCase() === filter[key].toLowerCase()
// 						);
// 					}
// 				});
// 			},
// 		);
// 		console.log(filtered);
// 		return filtered;
// 	}, [searchQuery, parcels, isFilterChange]);

// 	const handleOpenEditParcel = (parcel: any) => {
// 		setSelectedParcel(parcel);
// 		setIsEditParcelOpen(true);
// 	};
// 	const handleEditParcel = (parcel: {
// 		id: string;
// 		type: string;
// 		weight: number;
// 		size: string;
// 		status: string;
// 	}) => {
// 		const id = parcel.id;
	
// 		const updatedParcels = parcels?.map((parcelIndex) => {
// 			if (parcelIndex.parcel_id.toString() === id) {
// 				return { ...parcelIndex, ...parcel };
// 			}
// 			return parcelIndex;
// 		});
	
// 		setParcels(updatedParcels);
// 	};

// 	return (
// 		<div className="container mx-auto p-4">
// 			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
// 				<div className="mb-3">
// 					<div className="flex flex-row gap-1">
// 						<h1 className="text-2xl font-bold">Parcel &gt; </h1>
// 						<h1
// 							className="text-2xl font-bold"
// 							style={{
// 								color: "#FF8A00",
// 							}}
// 						>
// 							List of Parcels
// 						</h1>
// 					</div>
// 					<div
// 						style={{
// 							backgroundColor: "#F24E1E",
// 							height: 1,
// 							width: 260,
// 						}}
// 					/>
// 				</div>
// 				<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
// 					<TextField
// 						variant="outlined"
// 						size="small"
// 						placeholder="Search by ID, Type, Size, Weight, Status"
// 						value={searchQuery}
// 						onChange={handleSearch}
// 						InputProps={{
// 							endAdornment: (
// 								<IconButton>
// 									<Search />
// 								</IconButton>
// 							),
// 						}}
// 					/>
// 					<Button
// 						variant="contained"
// 						startIcon={<FilterList />}
// 						onClick={() => setIsFilterParcelOpen(true)}
// 					>
// 						Filter
// 					</Button>
// 					<Button
// 						variant="contained"
// 						color="secondary"
// 						startIcon={<RxReset />}
// 						onClick={handleResetFilter}
// 					>
// 						Reset Filter
// 					</Button>
// 					<Button
// 						variant="contained"
// 						color="primary"
// 						onClick={() => setIsAddParcelOpen(true)}
// 					>
// 						Add Parcel
// 					</Button>

// 				</div>
// 			</div>
// 			<div className="overflow-y-auto max-h-[73vh]">
// 				<table className="w-full bg-white rounded-lg shadow-md">
// 					<thead>
// 						<tr>
// 							<th className="p-4 text-left">
// 								<Checkbox
// 									checked={selectedParcels?.length === parcels?.length}
// 									onChange={handleSelectAllClick}
// 								/>
// 							</th>
// 							<th className="p-4 text-left">ID</th>
// 							<th className="p-4 text-left">Weight</th>
// 							<th className="p-4 text-left">Height</th>
// 							<th className="p-4 text-left">Width</th>
// 							<th className="p-4 text-left">Length</th>
// 							<th className="p-4 text-left">Type</th>
// 							<th className="p-4 text-left">Date Created</th>
// 							{/* <th className="p-4 text-left">Actions</th> */}
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{filteredParcels
// 							?.slice(
// 								(currentPage - 1) * parcelsPerPage,
// 								currentPage * parcelsPerPage,
// 							)
// 							.map((parcel) => (
// 								<tr key={parcel.parcel_id} className="border-t">
// 									<td className="p-4 w-fit">
// 										<Checkbox
// 											checked={selectedParcels?.includes(parcel.parcel_id)}
// 											onChange={() => handleCheckboxChange(parcel.parcel_id)}
// 										/>
// 									</td>
// 									<td className="p-4 w-fit">{parcel.parcel_id}</td>

// 									<td className="p-4 w-fit">{parcel.weight} cm</td>
// 									<td className="p-4 w-fit">{parcel.height} cm</td>
// 									<td className="p-4 w-fit">{parcel.weight} cm</td>
// 									<td className="p-4 w-fit">{parcel.length} cm</td>
// 									<td className="p-4 w-fit">{`${parcel.parcel_size}`}</td>
// 									<td className="p-4 w-fit">{`${new Date(`${parcel.date_created}`).toUTCString()}`}</td>
// 									{/* <td className="p-4">
// 										<span
// 											className={`px-2 py-1 rounded-md text-xs font-medium ${
// 												parcel.status === "Ongoing"
// 													? "bg-green-100 text-green-800 px-5 py-2"
// 													: parcel.status === "Completed"
// 														? "bg-yellow-100 text-yellow-800 px-4 py-2"
// 														: "bg-red-100 text-red-800 px-4 py-2"
// 											}`}
// 										>
// 											{parcel.status}
// 										</span>
// 									</td> */}
// 									{/* <td className="p-4">
// 										<button
// 											className="bg-white p-1"
// 											onClick={() => handleOpenEditParcel(parcel)}
// 										>
// 											<Edit />
// 										</button>
						
// 									</td> */}
// 								</tr>
// 							))}
// 					</tbody>
// 				</table>
// 			</div>
// 			<div className="flex justify-center items-center mt-4">
// 				{currentPage === 1 ? (
// 					<Button disabled>
// 						<ArrowLeft />
// 					</Button>
// 				) : (
// 					<Button
// 						sx={{ color: "black" }}
// 						onClick={() => handlePageChange(currentPage - 1)}
// 					>
// 						<ArrowLeft />
// 					</Button>
// 				)}
// 				<Button>
// 					{currentPage}
// 				</Button>
// 				{currentPage === totalPages ? (
// 					<Button disabled>
// 						<ArrowRight />
// 					</Button>
// 				) : (
// 					<Button
// 						sx={{ color: "black" }}
// 						onClick={() => handlePageChange(currentPage + 1)}
// 					>
// 						<ArrowRight />
// 					</Button>
// 				)}
// 			</div>
// 			<AddParcel
// 				open={isAddParcelOpen}
// 				onAddParcel={handleAddParcel}
// 				onClose={() => setIsAddParcelOpen(false)}
// 			/>
// 			<FilterParcel
// 				open={isFilterParcelOpen}
// 				onFilterParcel={handleFilterParcel}
// 				onClose={() => setIsFilterParcelOpen(false)}
// 			/>
// 			<EditParcel
// 				open={isEditParcelOpen}
// 				onEditParcel={handleEditParcel}
// 				onClose={() => setIsEditParcelOpen(false)}
// 				selectedParcel={selectedParcel}
// 			/>
// 		</div>
// 	);
// };

// export default ParcelTable;
