import React, { useState } from "react";
import { Button, TextField, MenuItem, Box, Modal } from "@mui/material";

interface AddParcelProps {
  onAddParcel: (parcel: {
    id: string;
    type: string;
    weight: string;
    size: string;
    status: string;
  }) => void;
  open: boolean;
  onClose: () => void;
}

const AddParcel: React.FC<AddParcelProps> = ({
  onAddParcel,
  open,
  onClose,
}) => {
  const [newParcel, setNewParcel] = useState({
    id: "",
    type: "",
    weight: "",
    size: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewParcel({ ...newParcel, [name]: value });
  };

  const handleSubmit = () => {
    onAddParcel(newParcel);
    onClose();
    // Reset form fields after submission
    setNewParcel({
      id: "",
      type: "",
      weight: "",
      size: "",
      status: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 24,
          width: 400,
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <TextField
          name="id"
          label="Parcel ID"
          value={newParcel.id}
          onChange={handleInputChange}
        />
        <TextField
          name="type"
          label="Type of Parcel"
          value={newParcel.type}
          onChange={handleInputChange}
        />
        <TextField
          name="size"
          label="Size of Parcel"
          value={newParcel.size}
          onChange={handleInputChange}
        />

        <TextField
          name="weight"
          label="Weight"
          value={newParcel.weight}
          onChange={handleInputChange}
        />
        <TextField
          select
          name="status"
          label="Status"
          value={newParcel.status}
          onChange={handleInputChange}
        >
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Parcel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddParcel;
