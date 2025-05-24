import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { RoleDetail, User, Token, Credential } from "../../../models/user";
import UserService from "../../../services/UserService";
import { AxiosError } from "axios";

interface EditUserProps {
    onEditUser: (user: User) => void;
    open: boolean;
    onClose: () => void;
    selectedUser: User;
}

const EditUser: React.FC<EditUserProps> = ({
    onEditUser,
    open,
    onClose,
    selectedUser,
}) => {
    const [updateUser, setUpdateUser] = useState<User>({
        user_id: 0,
        role: { name: "", role_id: 0 } as RoleDetail,
        name: "",
        username: "",
        gender: "",
        age: 0,
        email: "",
        address: "",
        phone: "",
        accessToken: {} as Token,
        credentials: {} as Credential,
    });

    useEffect(() => {
        setUpdateUser({ ...selectedUser });
    }, [selectedUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;

        if (typeof name === 'string') {
            setUpdateUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleApply = async () => {
        try {
            const [updatedUser, error] = await UserService.put(updateUser.user_id, updateUser);
            if (error) {
                throw error;
            }
            onEditUser(updatedUser);
            onClose();
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error updating user:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleCancel = () => {
        onClose();
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
                    gap: 2,
                    padding: 4,
                    borderRadius: 2,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div className="text-white font-bold text-3xl">
                    Edit User Information
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
                    <TextField
                        fullWidth
                        name="name"
                        label="User Real name"
                        value={updateUser.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        select
                        name="role"
                        label="User role"
                        value={updateUser.role.name}
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value="admin">Admin</MenuItem>

                        <MenuItem value="shipper">Shipper</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        name="email"
                        label="User email"
                        value={updateUser.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        name="phone"
                        label="User Phone number"
                        value={updateUser.phone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        value={updateUser.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        name="gender"
                        label="User gender"
                        value={updateUser.gender}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        name="age"
                        label="User age"
                        type="number"
                        value={updateUser.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        name="address"
                        label="User address"
                        value={updateUser.address}
                        onChange={handleInputChange}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#FF8A00",
                                color: "white",
                                ":hover": { backgroundColor: "#FF8A00" },
                            }}
                            onClick={handleApply}
                            disabled
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
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUser;
