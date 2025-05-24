import React, { useEffect, useState, useMemo } from "react";
import {
	Button,
	// Checkbox,
	IconButton,
	TextField,
	CircularProgress,
} from "@mui/material";
import {
	Search,
	// FilterList,
	// Edit,
	ArrowLeft,
	ArrowRight,
} from "@mui/icons-material";
// import { RxReset } from "react-icons/rx";
import { Shipper } from "../../models/shipper";
import ShipperService from "../../services/ShipperService";

const ShipperTable: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	// const [selectedShippers, setSelectedShippers] = useState<number[]>([]);
	const shippersPerPage = 10;
	const [shippers, setShippers] = useState<Shipper[]>([]);
	// const [selectedShipper, setSelectedShipper] = useState<Shipper | null>(null);
	// const [isEditShipperOpen, setIsEditShipperOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	// const [isFilterShipperOpen, setIsFilterShipperOpen] = useState(false);
	const [filter, 
		// setFilter
	] = useState<{ [key: string]: string | number }>({});
	const [isFilterChange, 
		// setIsFilterChange
	] = useState(false);
	useEffect(() => {
		fetchShippers();
	}, [currentPage, shippersPerPage]);

	const fetchShippers = async () => {
		setLoading(true);
		setError(null);
		try {
			const respond = await ShipperService.getShipperPage(currentPage, shippersPerPage);
			const listShipper: Shipper[] = respond[0]?.data || [];
			const totalPages = respond[0]?.total_pages || 0;
			if (currentPage == 1) {
				setShippers(listShipper);
			}
			else setShippers(shippers.concat(listShipper));
			setTotalPages(totalPages);
		} catch (e) {
			console.error("Error fetching shippers:", e);
			setError("Failed to load shippers. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	// const handleSelectAllClick = () => {
	// 	if (selectedShippers.length === filteredShippers.length) {
	// 		setSelectedShippers([]);
	// 	} else {
	// 		const allShipperIds = filteredShippers.map((shipper) => shipper.shipper_id);
	// 		setSelectedShippers(allShipperIds);
	// 	}
	// };

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};


	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	// const handleCheckboxChange = (shipperId: number) => {
	// 	const selectedIndex = selectedShippers.indexOf(shipperId);
	// 	let newSelected: number[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = [...selectedShippers, shipperId];
	// 	} else {
	// 		newSelected = selectedShippers.filter((id) => id !== shipperId);
	// 	}

	// 	setSelectedShippers(newSelected);
	// };


	// const handleResetFilter = () => {
	// 	setSearchQuery("");
	// 	setFilter({});
	// 	setIsFilterChange((prev) => !prev);
	// };


	const filteredShippers = useMemo(() => {
		const normalizedQuery = searchQuery.toLowerCase();


		const searched = shippers.filter((shipper) => {
			return (
				shipper.shipper_id.toString().includes(normalizedQuery) ||
				shipper.name.toLowerCase().includes(normalizedQuery) ||
				shipper.phone.toString().includes(normalizedQuery) ||
				shipper.address.toLowerCase().includes(normalizedQuery) ||
				shipper.age.toString().includes(normalizedQuery)
			);
		});


		const filtered = searched.filter((shipper) =>
			Object.keys(filter).every((key) => {
				if (!filter[key]) return true;
				return shipper[key as keyof Shipper]?.toString() === filter[key]?.toString();
			})
		);

		return filtered;
	}, [isFilterChange, searchQuery, shippers, filter]);


	// const handleOpenEditShipper = (shipper: Shipper) => {
	// 	setSelectedShipper(shipper);
	// 	setIsEditShipperOpen(true);
	// };

	if (loading) {
		return (
			<div className="loader-container">
				<CircularProgress /> Loading shippers...
			</div>
		);
	}

	if (error) {
		return <div className="error-container">{error}</div>;
	}


	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
				<div className="mb-3">
					<div className="flex flex-row gap-1">
						<h1 className="text-2xl font-bold">Shipper &gt; </h1>
						<h1
							className="text-2xl font-bold"
							style={{
								color: "#FF8A00",
							}}
						>
							List of Shippers
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

				<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
					<TextField
						variant="outlined"
						size="small"
						placeholder="Search by ID, Shipper, Email, Phone..."
						value={searchQuery}
						onChange={handleSearch}
						InputProps={{
							endAdornment: (
								<IconButton>
									<Search />
								</IconButton>
							),
						}}
					/>
					{/* <Button
						variant="contained"
						startIcon={<FilterList />}
						onClick={() => setIsFilterShipperOpen(true)}
					>
						Filter
					</Button>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<RxReset />}
						onClick={handleResetFilter}
					>
						Reset Filter
					</Button> */}
				</div>
			</div>
			<div className="overflow-y-auto max-h-[73vh] flex justify-center">
				<table className="w-full bg-white rounded-lg shadow-md mx-auto">
					<thead>
						<tr>
							{/* <th className="p-4 w-[2%] text-left">
								<Checkbox
									checked={selectedShippers.length === shippers.length}
									onChange={handleSelectAllClick}
								/>
							</th> */}
							<th className="p-4 w-[5%] pl-10 text-left">ID</th>
							<th className="p-4 w-[15%] text-left">Shipper</th>
							<th className="p-4 w-[15%] text-left">Role</th>
							<th className="p-4 w-[20%] text-left">Phone</th>
							<th className="p-4 w-[20%] text-left">Address</th>

							{/* <th className="p-4 w-[5%] text-left">Actions</th> */}
						</tr>
					</thead>
					<tbody>
						{filteredShippers
							.slice(
								(currentPage - 1) * shippersPerPage,
								currentPage * shippersPerPage
							)
							.map((shipper: Shipper) => (
								<tr key={shipper.shipper_id} className="border-t">
									{/* <td className="p-4">
										<Checkbox
											checked={selectedShippers.includes(shipper.shipper_id)}
											onChange={() => handleCheckboxChange(shipper.shipper_id)}
										/>
									</td> */}
									<td className="p-4 pl-10">{shipper.shipper_id}</td>
									<td className="p-4">
										<div>
											<div className="font-bold text-sm">{shipper.name}</div>
										</div>
									</td>
									<td className="p-4">Shipper</td>
									<td className="p-4">{shipper.phone}</td>
									<td className="p-4">{shipper.address}</td>

									{/* <td className="p-4">
										<IconButton onClick={() => handleOpenEditShipper(shipper)}>
											<Edit />
										</IconButton>
									</td> */}
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className="flex justify-center items-center mt-4">
				{currentPage == 1 ? (
					<Button disabled>
						<ArrowLeft />
					</Button>
				) : (
					<Button
						sx={{ color: "black" }}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						<ArrowLeft />
					</Button>
				)}
				<Button >
					{currentPage}
				</Button>
				{currentPage == totalPages ? (
					<Button disabled>
						<ArrowRight />
					</Button>
				) : (
					<Button
						sx={{ color: "black" }}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						<ArrowRight />
					</Button>
				)}
			</div>
		</div>
	);
};

export default ShipperTable;