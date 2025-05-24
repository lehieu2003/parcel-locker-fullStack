  import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useState } from "react";

interface FilterLockerProps {
  onFilterLocker: (locker: {
    locker_id: string;
    name: string;
    address: string;
    cells: string;
    status: string;
  }) => void;
  open: boolean;
  onClose: () => void;
}

const FilterLocker: React.FC<FilterLockerProps> = ({
  onFilterLocker,
  open,
  onClose,
}) => {
  const [criteria, setCriteria] = useState({
    locker_id: "",
    name: "",
    address: "",
    cells: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleApply = () => {
    onFilterLocker(criteria);

    onClose();
    // Reset form fields after submission
    setCriteria({
      locker_id: "",
      name: "",
      address: "",
      cells: "",
      status: "",
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form fields after submission
    setCriteria({
      locker_id: "",
      name: "",
      address: "",
      cells: "",
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
                name="locker_id"
                label="Enter locker ID"
                value={criteria.locker_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex items-center">Status</div>
              <TextField
                select
                name="status"
                label="Locker status"
                value={criteria.status}
                onChange={handleInputChange}
                className="w-40"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-7">
              <div className="flex items-center">Name</div>

              <TextField
                className="w-40"
                name="name"
                label="Enter locker name"
                value={criteria.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex items-center">Cells</div>
              <TextField
                className="w-40"
                name="cells"
                label="Enter cells"
                value={criteria.cells}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex items-center">Address</div>
            <TextField
              className="w-full"
              name="address"
              label="Enter locker address"
              value={criteria.address}
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
              Cancle
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
};

export default FilterLocker;
