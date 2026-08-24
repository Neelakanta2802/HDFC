import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  Button,
  Tabs,
  Tab,
  Paper,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
} from "@mui/material";
import {
  PhoneAndroidIcon,
  BoltIcon,
  DirectionsCarIcon,
  TvIcon,
  RouterIcon,
  LocalGasStationIcon,
  CheckCircleIcon,
  CloseIcon,
} from "../Icons/HDFCIcons";
import api from "../../services/api";

const BILL_CATEGORIES = [
  { label: "Mobile Prepaid", icon: <PhoneAndroidIcon fontSize="small" /> },
  { label: "Electricity", icon: <BoltIcon fontSize="small" /> },
  { label: "FASTag", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "DTH / Cable", icon: <TvIcon fontSize="small" /> },
  { label: "Broadband", icon: <RouterIcon fontSize="small" /> },
  { label: "Gas / LPG", icon: <LocalGasStationIcon fontSize="small" /> },
];

export default function Bills_Recharge() {
  const [bills, setBills] = useState([]);
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Form State
  const [consumerNumber, setConsumerNumber] = useState("");
  const [operator, setOperator] = useState("Airtel");
  const [amount, setAmount] = useState("");

  // Receipt Modal
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [paidBillDetails, setPaidBillDetails] = useState(null);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    async function fetchBills() {
      try {
        setLoading(true);
        const res = await api.get("/api/billsrecharge");
        setBills(res.data.data || []);
      } catch (err) {
        console.error("Error loading bills:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBills();
  }, []);

  const handleQuickRecharge = (e) => {
    e.preventDefault();
    if (!consumerNumber || !amount) {
      setSnackbarMsg("Please enter consumer number and amount.");
      return;
    }

    setPaidBillDetails({
      type: BILL_CATEGORIES[categoryIdx].label,
      number: consumerNumber,
      amount: amount,
      txnId: "BILL" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    });

    setPaymentSuccessModal(true);
    setConsumerNumber("");
    setAmount("");
  };

  const handlePaySavedBill = (bill) => {
    setPaidBillDetails({
      type: bill.type,
      number: bill.consumerNumber || bill.billId,
      amount: bill.amount,
      txnId: "TXN" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    });
    setPaymentSuccessModal(true);
  };

  return (
    <Box sx={{ bgcolor: "#f4f7fb", minHeight: "calc(100vh - 64px)", py: 4 }}>
      <Container maxWidth="xl">
        {/* Page Title */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#002855" }}>
            Bill Payments & Recharge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pay utility bills and recharge mobile or DTH accounts
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {/* Left Column: Quick Pay & Recharge Form */}
          <Grid item xs={12} lg={7}>
            <Paper sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: "10px", mb: 3.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855", mb: 2 }}>
                Quick Recharge & Pay
              </Typography>

              {/* Category Selector Tabs */}
              <Tabs
                value={categoryIdx}
                onChange={(e, val) => setCategoryIdx(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  mb: 3,
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "13px",
                    minHeight: 46,
                  },
                }}
              >
                {BILL_CATEGORIES.map((cat, i) => (
                  <Tab key={i} icon={cat.icon} iconPosition="start" label={cat.label} />
                ))}
              </Tabs>

              {/* Form */}
              <Box component="form" onSubmit={handleQuickRecharge}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                      Service Provider *
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                    >
                      {["Airtel", "Jio", "Vodafone Idea (Vi)", "BSNL", "State Electricity Board", "Tata Play", "Dish TV"].map((op) => (
                        <MenuItem key={op} value={op}>
                          {op}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                      {BILL_CATEGORIES[categoryIdx].label === "FASTag"
                        ? "Vehicle Number *"
                        : "Consumer / Mobile Number *"}
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={BILL_CATEGORIES[categoryIdx].label === "FASTag" ? "e.g. MH02CB1234" : "e.g. 9876543210"}
                      value={consumerNumber}
                      onChange={(e) => setConsumerNumber(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                      Amount (₹) *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="e.g. 499"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#1e293b", display: "block", mb: 0.5 }}>
                      Payment Account
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value="Savings Account (•••• 1045)"
                    >
                      <MenuItem value="Savings Account (•••• 1045)">
                        Savings Account (•••• 1045)
                      </MenuItem>
                    </TextField>
                  </Grid>

                  {/* Popular Amount Chips */}
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">Quick select:</Typography>
                      {["299", "499", "719", "999"].map((val) => (
                        <Chip
                          key={val}
                          label={`₹${val}`}
                          size="small"
                          onClick={() => setAmount(val)}
                          sx={{ cursor: "pointer", fontWeight: 700 }}
                        />
                      ))}
                    </Stack>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.3,
                    bgcolor: "#004b87",
                    fontWeight: 700,
                    fontSize: "14px",
                    "&:hover": { bgcolor: "#002855" },
                  }}
                >
                  Pay Bill
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Saved Bills */}
          <Grid item xs={12} lg={5}>
            <Paper sx={{ p: 3, borderRadius: "10px", mb: 3.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855" }}>
                  Saved Bills ({bills.length})
                </Typography>
                <Chip label="Upcoming" size="small" color="primary" variant="outlined" />
              </Stack>

              <Stack spacing={2}>
                {bills.map((bill, idx) => (
                  <Card key={idx} variant="outlined" sx={{ p: 2, borderRadius: "8px", bgcolor: "#f8fafc" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#004b87" }}>
                          {bill.billerName || bill.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                          No: {bill.consumerNumber || bill.billId}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#d32f2f", fontWeight: 600 }}>
                          Due Date: {bill.dueDate}
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1e293b" }}>
                          ₹{bill.amount.toLocaleString("en-IN")}
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handlePaySavedBill(bill)}
                          sx={{
                            mt: 0.5,
                            bgcolor: "#ed1c24",
                            "&:hover": { bgcolor: "#b80c13" },
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          Pay
                        </Button>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Paper>

            {/* Quick Links */}
            <Paper sx={{ p: 2.5, borderRadius: "10px" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#002855", mb: 1.5 }}>
                Help & Services
              </Typography>
              <Stack spacing={1}>
                {[
                  "Electricity Board Payments",
                  "Water & Municipal Taxes",
                  "Credit Card Bill Payments",
                  "Download Tax Statements",
                ].map((linkText, i) => (
                  <Box
                    key={i}
                    onClick={() => setSnackbarMsg(`Opening ${linkText}`)}
                    sx={{
                      py: 0.8,
                      px: 1.2,
                      borderRadius: "6px",
                      bgcolor: "#f8fafc",
                      cursor: "pointer",
                      fontSize: "12.5px",
                      color: "#334155",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "&:hover": { bgcolor: "#e2e8f0", color: "#004b87" },
                    }}
                  >
                    <span>{linkText}</span>
                    <span style={{ color: "#94a3b8" }}>›</span>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Success Modal */}
      <Dialog open={paymentSuccessModal} onClose={() => setPaymentSuccessModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#2e7d32" }}>
            Payment Successful
          </Typography>
          <IconButton size="small" onClick={() => setPaymentSuccessModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ textAlign: "center", py: 1.5 }}>
            <CheckCircleIcon sx={{ fontSize: 50, color: "#2e7d32", mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#002855" }}>
              ₹{paidBillDetails?.amount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Paid for {paidBillDetails?.type} ({paidBillDetails?.number})
            </Typography>
          </Box>

          <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: "8px" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
              <Typography variant="caption" color="text.secondary">Reference ID</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{paidBillDetails?.txnId}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
              <Typography variant="caption" color="text.secondary">Date</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{paidBillDetails?.date}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">Status</Typography>
              <Chip label="COMPLETED" size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 700, height: 20, fontSize: "10px" }} />
            </Stack>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button fullWidth variant="contained" onClick={() => setPaymentSuccessModal(false)} sx={{ bgcolor: "#004b87", fontWeight: 700 }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbarMsg)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMsg("")}
        message={snackbarMsg}
      />
    </Box>
  );
}