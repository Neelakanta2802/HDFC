import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import {
  DashboardIcon,
  CreditCardIcon,
  ReceiptLongIcon,
  LogoutIcon,
  PersonIcon,
} from "../Icons/HDFCIcons";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const userName = localStorage.getItem("UserName") || "User";
  const customerID = localStorage.getItem("CustomerID") || "User";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    localStorage.removeItem("CustomerID");
    localStorage.removeItem("UserName");
    localStorage.removeItem("fullname");
    window.location.href = "/login";
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { label: "Cards", path: "/cards", icon: <CreditCardIcon fontSize="small" /> },
    { label: "Bills & Recharge", path: "/bills", icon: <ReceiptLongIcon fontSize="small" /> },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#004b87",
        boxShadow: "0 2px 8px rgba(0, 40, 85, 0.15)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 58, md: 64 } }}>
          {/* Bank Logo / Brand */}
          <Box
            component={Link}
            to="/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
              mr: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                bgcolor: "#ed1c24",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "18px",
                width: 34,
                height: 34,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              M
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  lineHeight: 1.1,
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                }}
              >
                MERN BANK
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#90caf9",
                  fontSize: "10px",
                  fontWeight: 600,
                  display: "block",
                }}
              >
                NetBanking Portal
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: "flex", gap: { xs: 0.5, md: 1.5 } }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.85)",
                    bgcolor: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                    fontWeight: isActive ? 700 : 500,
                    px: { xs: 1.5, md: 2 },
                    py: 0.8,
                    fontSize: { xs: "12.5px", md: "13.5px" },
                    borderRadius: "6px",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.22)",
                      color: "#ffffff",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* User Profile & Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                {userName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#cfe2ff", fontSize: "11px" }}>
                ID: {customerID}
              </Typography>
            </Box>

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0.5,
                border: "2px solid rgba(255,255,255,0.4)",
                "&:hover": { borderColor: "#fff" },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#ed1c24",
                  color: "#fff",
                  fontWeight: 700,
                  width: 34,
                  height: 34,
                  fontSize: "14px",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  width: 220,
                  borderRadius: "8px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  mt: 1,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Customer ID: {customerID}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => { handleMenuClose(); navigate("/dashboard"); }}>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate("/cards"); }}>
                <ListItemIcon><CreditCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Cards" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "#d32f2f" }}>
                <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} /></ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
