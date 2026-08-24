import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import {
  PersonIcon,
  BadgeIcon,
  LockIcon,
  PhoneIphoneIcon,
  PublicIcon,
  Visibility,
  VisibilityOff,
  HowToRegIcon,
  CheckCircleIcon,
} from "../Icons/HDFCIcons";
import AuthSidebar from "../AuthSidebar/AuthSidebar";
import api from "../../services/api";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Singapore",
  "Canada",
  "Australia",
];

export default function Signup() {
  const [formData, setFormData] = useState({
    UserName: "",
    fullname: "",
    CustomerID: "",
    Password: "",
    confirmPassword: "",
    country: "India",
    mobileNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function generateRandomCustomerID() {
    const randomID = "BANK" + Math.floor(100000 + Math.random() * 900000);
    setFormData((prev) => ({ ...prev, CustomerID: randomID }));
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (
      !formData.UserName.trim() ||
      !formData.fullname.trim() ||
      !formData.CustomerID.trim() ||
      !formData.Password ||
      !formData.country ||
      !formData.mobileNumber.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      setError("Passwords do not match. Please check and re-enter.");
      return;
    }

    if (formData.Password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/signup", {
        UserName: formData.UserName.trim(),
        fullname: formData.fullname.trim(),
        CustomerID: formData.CustomerID.trim(),
        Password: formData.Password,
        country: formData.country,
        mobileNumber: formData.mobileNumber.trim(),
      });

      setSuccessMsg(response.data.message || "Account registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please verify your details.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Column: Clean Banking Feature Sidebar */}
        <Grid item xs={12} md={5} lg={5}>
          <AuthSidebar
            title="Create NetBanking Account"
            subtitle="Register to manage your accounts, transfer funds, and access banking services online."
          />
        </Grid>

        {/* Right Column: NetBanking Registration Form */}
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 2.5, sm: 4, md: 5 },
            overflowY: "auto",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 540,
              p: { xs: 3, sm: 4 },
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 40, 85, 0.06)",
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
            }}
          >
            {/* Title Header */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#002855" }}>
                NetBanking Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your details to create your NetBanking account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {successMsg && (
              <Alert
                icon={<CheckCircleIcon fontSize="inherit" />}
                severity="success"
                sx={{ mb: 2.5, borderRadius: 2 }}
              >
                {successMsg} Redirecting to login...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignup}>
              <Grid container spacing={2}>
                {/* Full Name */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Full Name *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="fullname"
                    placeholder="e.g. Harish Kumar"
                    value={formData.fullname}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Username */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Username *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="UserName"
                    placeholder="e.g. harish_k"
                    value={formData.UserName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Customer ID */}
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b" }}>
                      Customer ID *
                    </Typography>
                    <Button
                      size="small"
                      onClick={generateRandomCustomerID}
                      sx={{ fontSize: "11px", p: 0, color: "#004b87", textTransform: "none" }}
                    >
                      Generate ID
                    </Button>
                  </Stack>
                  <TextField
                    fullWidth
                    size="small"
                    name="CustomerID"
                    placeholder="Choose Customer ID (e.g. BANK100291)"
                    value={formData.CustomerID}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Mobile Number */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Mobile Number *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="mobileNumber"
                    placeholder="10-digit Mobile"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIphoneIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Country */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Country *
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Password *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder="Min 6 characters"
                    value={formData.Password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                    Confirm Password *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" sx={{ color: "#004b87" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={!loading && <HowToRegIcon />}
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontSize: "15px",
                  fontWeight: 700,
                  bgcolor: "#004b87",
                  "&:hover": { bgcolor: "#002855" },
                  borderRadius: "8px",
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "REGISTER ACCOUNT"}
              </Button>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already registered?
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="text"
                sx={{ fontWeight: 700, color: "#004b87", mt: 0.5 }}
              >
                ← Back to Login
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
