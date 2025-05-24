import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useState } from "react";

interface FilterParcelProps {
	onFilterParcel: (parcel: {
		parcel_id: string;
		status: string;
		parcel_size: string;
		size: string;
		weight: string;
	}) => void;
	open: boolean;
	onClose: () => void;
}

const FilterParcel: React.FC<FilterParcelProps> = ({
  onFilterParcel,
  open,
  onClose,
}) => {
  const [criteria, setCriteria] = useState({
		parcel_id: "",
		parcel_size: "",
		size: "",
		weight: "",
		status: "",
	});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleApply = () => {
    onFilterParcel(criteria);
    onClose();
    // Reset form fields after submission
    setCriteria({
			parcel_id: "",
			parcel_size: "",
			size: "",
			weight: "",
			status: "",
		});
  };

  const handleCancel = () => {
    onClose();
    // Reset form fields after submission
    setCriteria({
			parcel_id: "",
			parcel_size: "",
			size: "",
			weight: "",
			status: "",
		});
  };
  return (
		<Modal open={open} onClose={onClose}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#213E60",
					width: 600,
					margin: "auto",
					marginTop: "10%",
					gap: 15,
					padding: 50,
					paddingTop: 20,
					paddingBottom: 40,
					borderRadius: 10,
				}}
			>
				<div className="text-white font-bold text-3xl">Filter</div>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						p: 3,
						bgcolor: "background.paper",
						boxShadow: 24,
						borderRadius: 2,
					}}
				>
					<div className="flex flex-row gap-4">
						<div className="flex flex-row gap-12">
							<div className="flex items-center">ID</div>

							<TextField
								className="w-40"
								name="parcel_id"
								label="Enter parcel ID"
								value={criteria.parcel_id}
								onChange={handleInputChange}
							/>
						</div>

						<div className="flex flex-row gap-2">
							<div className="flex items-center">Status</div>
							<TextField
								select
								name="status"
								label="Parcel status"
								value={criteria.status}
								onChange={handleInputChange}
								className="w-40"
							>
								<MenuItem value="Completed">Completed</MenuItem>
								<MenuItem value="Canceled">Canceled</MenuItem>
								<MenuItem value="Ongoing">Ongoing</MenuItem>
							</TextField>
						</div>
					</div>

					<div className="flex flex-row gap-4">
						<div className="flex flex-row gap-7">
							<div className="flex items-center">Size</div>

							<TextField
								className="w-40"
								name="size"
								label="Enter size"
								value={criteria.size}
								onChange={handleInputChange}
							/>
						</div>

						<div className="flex flex-row gap-3">
							<div className="flex items-center">Weight</div>
							<TextField
								className="w-40"
								name="weight"
								label="Enter weight"
								value={criteria.weight}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-5">
						<div className="flex items-center">Type</div>
						<TextField
							className="w-full"
							name="parcel_size"
							label="Enter type"
							value={criteria.parcel_size}
							onChange={handleInputChange}
						/>
					</div>

					<div className="flex flex-row gap-4 justify-center">
						<Button
							variant="contained"
							sx={{
								backgroundColor: "#FF8A00",
								color: "white",
								":hover": { backgroundColor: "#FF8A00" },
							}}
							onClick={handleApply}
						>
							Apply
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "#D9D9D9",
								color: "black",
								":hover": { backgroundColor: "#D9D9D9" },
							}}
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</div>
				</Box>
			</div>
		</Modal>
	);
};

export default FilterParcel;
