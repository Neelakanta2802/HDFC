import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
  Stack,
} from "@mui/material";
import {
  AccountBalanceIcon,
  BusinessCenterIcon,
  CreditCardIcon,
} from "../Icons/HDFCIcons";
import NetBankingLoginForm from "../NetBankingLoginForm/NetBankingLoginForm";
import AuthSidebar from "../AuthSidebar/AuthSidebar";

function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Login() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Column: Clean Banking Feature Sidebar */}
        <Grid item xs={12} md={5} lg={5}>
          <AuthSidebar
            title="Welcome to NetBanking"
            subtitle="Access your personal accounts, credit cards, fund transfers, and bill payment services."
          />
        </Grid>

        {/* Right Column: Login Portal */}
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
            p: { xs: 2.5, sm: 4, md: 6 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 480,
              p: { xs: 3, sm: 4 },
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 40, 85, 0.06)",
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#002855" }}>
                NetBanking Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your Customer ID and password to access your account
              </Typography>
            </Box>

            {/* Tabs for Personal Banking / Corporate / Credit Cards */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "13px" },
                    minHeight: 48,
                  },
                }}
              >
                <Tab icon={<AccountBalanceIcon fontSize="small" />} iconPosition="start" label="Personal Banking" />
                <Tab icon={<BusinessCenterIcon fontSize="small" />} iconPosition="start" label="Corporate" />
                <Tab icon={<CreditCardIcon fontSize="small" />} iconPosition="start" label="Credit Cards" />
              </Tabs>
            </Box>

            {/* Tab 0: Personal NetBanking Form */}
            <CustomTabPanel value={tabValue} index={0}>
              <NetBankingLoginForm />
            </CustomTabPanel>

            {/* Tab 1: Corporate Banking */}
            <CustomTabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 2 }}>
                <BusinessCenterIcon sx={{ fontSize: 40, color: "#004b87", mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#002855", mb: 0.5 }}>
                  Corporate Banking Portal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For corporate salary uploads and commercial accounts. Please use the personal banking tab for standard accounts.
                </Typography>
              </Box>
            </CustomTabPanel>

            {/* Tab 2: Credit Cards Login */}
            <CustomTabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 2 }}>
                <CreditCardIcon sx={{ fontSize: 40, color: "#ed1c24", mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#002855", mb: 0.5 }}>
                  Credit Card Portal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your credit card transactions directly via the Personal Banking login tab.
                </Typography>
              </Box>
            </CustomTabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
