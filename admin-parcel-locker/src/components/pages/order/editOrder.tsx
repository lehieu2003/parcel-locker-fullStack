import React, { useState, useEffect } from "react";
import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Order, OrderStatus, senderInformation } from "../../../models/order";
import { Parcel } from "../../../models/parcel";

interface EditOrderProps {
  onEditOrder: (order: Order) => void;
  open: boolean;
  onClose: () => void;
  selectedOrder: Partial<Order> | null;
}

const EditOrder: React.FC<EditOrderProps> = ({
  onEditOrder,
  open,
  onClose,
  selectedOrder,
}) => {
  const [updateOrder, setUpdateOrder] = useState<Order>({
    sending_address: { addressName: "", longtitude: 0, latitude: 0 },
    receiving_address: { addressName: "", longtitude: 0, latitude: 0 },
    ordering_date: "",
    sending_date: "",
    receiving_date: "",
    order_status: "" as OrderStatus,
    order_id: 0,
    sender_id: 0,
    sender_information: { name: "", phone: "", address: "" } as senderInformation,
    recipient_id: 0,
    parcel: {} as Parcel,
  });

  useEffect(() => {
    if (selectedOrder) {
      setUpdateOrder({
        ...updateOrder,
        ...selectedOrder,
        sender_information: selectedOrder.sender_information || {
          name: "",
          phone: "",
          address: "",
        },
        sending_address: selectedOrder.sending_address || {
          addressName: "",
          longtitude: 0,
          latitude: 0,
        },
        receiving_address: selectedOrder.receiving_address || {
          addressName: "",
          longtitude: 0,
          latitude: 0,
        },
      });
    }
  }, [selectedOrder]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateOrder((prev) => {
      if (["name", "phone", "address"].includes(name)) {
        return {
          ...prev,
          sender_information: { ...prev.sender_information, [name]: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleApply = () => {
    onEditOrder(updateOrder);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          width: "90%",
          maxWidth: 500,
          margin: "auto",
          mt: 10,
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          textAlign="center"
          mb={3}
          sx={{ color: "#213E60", fontWeight: "bold" }}
        >
          Edit Order Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Customer Name"
            name="name"
            value={updateOrder.sender_information.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={updateOrder.sender_information.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Sending Locker"
            name="sending_address"
            value={updateOrder.sending_address.addressName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Receiving Locker"
            name="receiving_address"
            value={updateOrder.receiving_address.addressName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Order Date"
            name="ordering_date"
            type="date"
            value={updateOrder.ordering_date}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Delivery Date"
            name="sending_date"
            type="date"
            value={updateOrder.sending_date}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            select
            label="Order Status"
            name="order_status"
            value={updateOrder.order_status}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Waiting">Waiting</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Packaging">Packaging</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF8A00",
              color: "white",
              ":hover": { backgroundColor: "#FF6A00" },
            }}
            onClick={handleApply}
			disabled
          >
            Apply
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#D9D9D9", color: "#213E60" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditOrder;
