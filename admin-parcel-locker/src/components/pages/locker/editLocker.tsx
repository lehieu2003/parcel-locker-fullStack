import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

interface EditLockerProps {
  onEditLocker: (locker: {
    name: string;
    latitude: string;
    longitude: string;
    address: string;
    cells: string;
    status: string;
  }) => void;
  open: boolean;
  onClose: () => void;
  selectedLocker: any;
}

const EditLocker: React.FC<EditLockerProps> = ({
  onEditLocker,
  open,
  onClose,
  selectedLocker,
}) => {
  const [updateLocker, setUpdateLocker] = useState({
    name: "",
    address: "",
    cells: "",
    status: "",
    latitude: "",
    longitude: "",
    ...selectedLocker,
  });

  React.useEffect(() => {
    setUpdateLocker({
      name: "",
      address: "",
      cells: "",
      status: "",
      latitude: "",
      longitude: "",
      ...selectedLocker,
    });
  }, [selectedLocker]);

  console.log(updateLocker);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateLocker({ ...updateLocker, [name]: value });
  };

  const handleApply = () => {
    onEditLocker(updateLocker);
    onClose();
    setUpdateLocker({
      name: "",
      address: "",
      cells: "",
      status: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form fields after submission
    setUpdateLocker({
      name: "",
      address: "",
      cells: "",
      status: "",
      latitude: "",
      longitude: "",
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
        <div className="text-white font-bold text-3xl">
          Edit locker information
        </div>

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
            <div className="flex flex-row gap-7">
              <div className="flex items-center">Name</div>

              <TextField
                className="w-40"
                name="name"
                label="Enter locker name"
                value={updateLocker.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex items-center">Cells</div>
              <TextField
                className="w-40"
                name="cells"
                label="Enter cells"
                value={updateLocker.cells}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-3">
              <div className="flex items-center">Latitude</div>

              <TextField
                className="w-35"
                name="latitude"
                label="Enter latitude "
                value={updateLocker.latitude}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex items-center">Longitude</div>
              <TextField
                className="w-35"
                name="longitude"
                label="Enter longitude"
                value={updateLocker.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row gap-3">
              <div className="flex items-center">Address</div>
              <TextField
                className="w-2/3"
                name="address"
                label="Enter locker address"
                value={updateLocker.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex items-center">Status</div>
              <TextField
                select
                name="status"
                label="Locker status"
                value={updateLocker.status}
                onChange={handleInputChange}
                className="w-40"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </div>
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

export default EditLocker;
