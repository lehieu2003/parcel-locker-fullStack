import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

interface EditParcelProps {
  onEditParcel: (parcel: {
    id: string;
    type: string;
    weight: string;
    size: string;
    address?: string;
    cells?: string;
    status: string;
  }) => void;
  open: boolean;
  onClose: () => void;
  selectedParcel: any;
}

const EditParcel: React.FC<EditParcelProps> = ({
  onEditParcel,
  open,
  onClose,
  selectedParcel,
}) => {
  const [updateParcel, setUpdateParcel] = useState({
    id: "",
    type: "",
    address: "",
    cells: "",
    status: "",
    ...selectedParcel,
  });

  React.useEffect(() => {
    setUpdateParcel({
      id: "",
      type: "",
      address: "",
      cells: "",
      status: "",
      ...selectedParcel,
    });
  }, [selectedParcel]);

  console.log(updateParcel);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateParcel({ ...updateParcel, [name]: value });
  };

  const handleApply = () => {
    onEditParcel(updateParcel);
    onClose();
    setUpdateParcel({
      id: "",
      type: "",
      address: "",
      cells: "",
      status: "",
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form fields after submission
    setUpdateParcel({
      id: "",
      type: "",
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
              <div className="flex items-center">Type</div>

              <TextField
                className="w-40"
                name="type"
                label="Enter parcel type"
                value={updateParcel.type}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex items-center">Status</div>
              <TextField
                select
                name="status"
                label="Parcel status"
                value={updateParcel.status}
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
            <div className="flex flex-row gap-3">
              <div className="flex items-center">Specific size</div>

              <TextField
                className="w-35"
                name="size"
                label="Enter Specific size "
                value={updateParcel.size}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex items-center">Weight</div>
              <TextField
                className="w-35"
                name="weight"
                label="Enter weight"
                value={updateParcel.weight}
                onChange={handleInputChange}
              />
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

export default EditParcel;
