import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useState } from "react";

interface FilterUserProps {
  onFilterUser: (user: {
    user_id: number;
    role: { name: string; role_id: number };
    name: string;
    username: string;
    gender: string;
    age: number;
    email: string;
    address: string;
    phone: string;
  }) => void;
  open: boolean;
  onClose: () => void;
}

const FilterUser: React.FC<FilterUserProps> = ({
  onFilterUser,
  open,
  onClose,
}) => {
  const [criteria, setCriteria] = useState({
    user_id: 0,
    role: { name: "", role_id: 0 },
    name: "",
    username: "",
    gender: "",
    age: 0,
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes("role")) {
      setCriteria({
        ...criteria,
        role: { ...criteria.role, name: value },
      });
    } else {
      setCriteria({
        ...criteria,
        [name]: name === "user_id" ? Number(value) : value,
      });
    }
  };

  const handleApply = () => {
    onFilterUser(criteria);
    onClose();
    resetForm();
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCriteria({
      user_id: 0,
      role: { name: "", role_id: 0 },
      name: "",
      username: "",
      gender: "",
      age: 0,
      email: "",
      address: "",
      phone: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#213E60",
          width: 600,
          margin: "auto",
          marginTop: "10%",
          gap: 2,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <div className="text-white font-bold text-3xl">Filter</div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <div className="flex flex-row gap-7">
            <div className="flex items-center">Role</div>
            <TextField
              select
              name="role"
              label="Role"
              value={criteria.role.name}
              onChange={handleInputChange}
              className="w-40"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </TextField>
          </div>

          <div className="flex flex-row gap-11">
            <div className="flex flex-row gap-4">
              <div className="flex items-center">Name</div>
              <TextField
                className="w-40"
                name="name"
                label="Enter user name"
                value={criteria.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex items-center">ID</div>
              <TextField
                className="w-40"
                name="user_id"
                label="Enter ID"
                type="number"
                value={criteria.user_id || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex items-center">Email</div>
            <TextField
              className="w-full"
              name="email"
              label="Enter email"
              value={criteria.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-row gap-3">
            <div className="flex items-center">Phone</div>
            <TextField
              className="w-full"
              name="phone"
              label="Enter phone"
              value={criteria.phone}
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
      </Box>
    </Modal>
  );
};

export default FilterUser;
