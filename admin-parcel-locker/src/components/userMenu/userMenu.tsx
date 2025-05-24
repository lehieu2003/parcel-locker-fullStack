import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
export default function UserMenu() {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const auth: any = useAuthUser();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <Box
        component="div"
        sx={{ display: "flex", "&:hover": { cursor: "pointer" } }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e)}
      >
        <Typography>{auth.username}</Typography>
        <Avatar
          alt="avatar"
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
