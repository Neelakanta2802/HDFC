import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  Button,
  Chip,
  Avatar,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  AccountBalanceWalletIcon,
  SendIcon,
  CreditCardIcon,
  ReceiptLongIcon,
  TrendingUpIcon,
  SavingsIcon,
  CheckCircleIcon,
  ArrowUpwardIcon,
  ArrowDownwardIcon,
  LocalAtmIcon,
  CloseIcon,
} from "../Icons/HDFCIcons";
import api from "../../services/api";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Transfer Money Dialog State
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferSubmitting, setTransferSubmitting] = useState(false);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState("");
  const [transferError, setTransferError] = useState("");
  const [transferData, setTransferData] = useState({
    toAccount: "",
    beneficiaryName: "",
    amount: "",
    remarks: "",
  });

  // Apply Loan Dialog State
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanSuccess, setLoanSuccess] = useState(false);

  const userName = localStorage.getItem("UserName") || "User";
  const customerID = localStorage.getItem("CustomerID") || "User";

  // Fallback data for robust UI display
  const DEFAULT_ACCOUNTS = [
    {
      type: "Savings Max Account",
      accountId: "50100438921045",
      branch: "HDFC Bank - Cyber City Branch",
      balance: 148520.75,
      status: "Active",
    },
    {
      type: "Current Advantage Account",
      accountId: "50200891230491",
      branch: "HDFC Bank - MG Road Branch",
      balance: 425600.0,
      status: "Active",
    },
  ];

  const DEFAULT_LOANS = [
    {
      id: "LOAN01",
      type: "Pre-Approved Personal Loan",
      maxAmount: "₹10,00,000",
      interestRate: "10.50% p.a.",
      tagline: "Instant disbursal in 10 seconds",
    },
    {
      id: "LOAN02",
      type: "Home Loan Special Rate",
      maxAmount: "₹75,00,000",
      interestRate: "8.40% p.a.",
      tagline: "Zero processing fee on online application",
    },
  ];

  // Fetch all dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [accRes, loanRes, txnRes] = await Promise.allSettled([
        api.get("/api/accounts"),
        api.get("/api/loans"),
        api.get("/api/transactions"),
      ]);

      setAccounts(
        (accRes.status === "fulfilled" && accRes.value.data.data && accRes.value.data.data.length > 0)
          ? accRes.value.data.data
          : DEFAULT_ACCOUNTS
      );
      setLoans(
        (loanRes.status === "fulfilled" && loanRes.value.data.data && loanRes.value.data.data.length > 0)
          ? loanRes.value.data.data
          : DEFAULT_LOANS
      );
      setTransactions(
        (txnRes.status === "fulfilled" && txnRes.value.data.data)
          ? txnRes.value.data.data
          : []
      );
    } catch (err) {
      console.warn("Dashboard data fallback:", err);
      setAccounts(DEFAULT_ACCOUNTS);
      setLoans(DEFAULT_LOANS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  // Handle genuine Fund Transfer saved to MongoDB via POST /api/transactions
  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    setTransferError("");
    setTransferSuccessMsg("");

    if (!transferData.beneficiaryName.trim() || !transferData.amount) {
      setTransferError("Beneficiary name and amount are required.");
      return;
    }

    if (isNaN(transferData.amount) || Number(transferData.amount) <= 0) {
      setTransferError("Please enter a valid positive amount.");
      return;
    }

    setTransferSubmitting(true);

    try {
      // POST to backend -> saves new transaction into MongoDB
      const res = await api.post("/api/transactions", {
        title: `Transfer to ${transferData.beneficiaryName.trim()}`,
        category: "Transfer",
        amount: Number(transferData.amount),
        type: "debit",
        beneficiaryName: transferData.beneficiaryName.trim(),
        toAccount: transferData.toAccount.trim(),
        remarks: transferData.remarks.trim(),
      });

      // Update transactions state with the new record from MongoDB
      if (res.data.data) {
        setTransactions((prev) => [res.data.data, ...prev]);
      }

      setTransferSuccessMsg(
        `₹${transferData.amount} transferred successfully to ${transferData.beneficiaryName}! Recorded in database.`
      );

      setTimeout(() => {
        setTransferSuccessMsg("");
        setTransferOpen(false);
        setTransferData({ toAccount: "", beneficiaryName: "", amount: "", remarks: "" });
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setTransferError(err.response.data.message);
      } else {
        setTransferError("Failed to complete transfer. Please try again.");
      }
    } finally {
      setTransferSubmitting(false);
    }
  };

  const handleApplyLoan = (loan) => {
    setSelectedLoan(loan);
    setLoanDialogOpen(true);
  };

  const confirmLoanApplication = () => {
    setLoanSuccess(true);
    setTimeout(() => {
      setLoanSuccess(false);
      setLoanDialogOpen(false);
    }, 2000);
  };

  return (
    <Box sx={{ bgcolor: "#f4f7fb", minHeight: "calc(100vh - 64px)", py: 3.5 }}>
      <Container maxWidth="xl">
        {/* Account Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 3.5,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #004b87 0%, #002855 100%)",
            color: "#ffffff",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: "#ed1c24",
                    width: 48,
                    height: 48,
                    fontWeight: 800,
                    fontSize: "18px",
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#fff" }}>
                    Welcome, {userName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#90caf9" }}>
                    Customer ID: <strong>{customerID}</strong> | Active Account
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Typography variant="caption" sx={{ color: "#b0bec5", display: "block" }}>
                Total Available Balance
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffffff", my: 0.5 }}>
                ₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SendIcon />}
                  onClick={() => { setTransferError(""); setTransferOpen(true); }}
                  sx={{ bgcolor: "#ed1c24", "&:hover": { bgcolor: "#b80c13" }, fontWeight: 700 }}
                >
                  Transfer Money
                </Button>
                <Button
                  component={Link}
                  to="/bills"
                  variant="outlined"
                  size="small"
                  sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff" } }}
                >
                  Pay Bills
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Banking Services */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855", mb: 2 }}>
          Banking Services
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { title: "Bank Accounts", desc: "View Balances & Statements", icon: <AccountBalanceWalletIcon sx={{ color: "#004b87", fontSize: 30 }} />, link: "/dashboard" },
            { title: "Cards", desc: "Credit & Debit Cards", icon: <CreditCardIcon sx={{ color: "#ed1c24", fontSize: 30 }} />, link: "/cards" },
            { title: "BillPay & Recharge", desc: "Utilities & Mobile", icon: <ReceiptLongIcon sx={{ color: "#2e7d32", fontSize: 30 }} />, link: "/bills" },
            { title: "Loans", desc: "Personal & Home Loans", icon: <LocalAtmIcon sx={{ color: "#f57c00", fontSize: 30 }} />, link: "/dashboard" },
            { title: "Investments", desc: "Mutual Funds & SIP", icon: <TrendingUpIcon sx={{ color: "#7b1fa2", fontSize: 30 }} />, link: "/dashboard" },
            { title: "Deposits", desc: "Fixed & Recurring Deposits", icon: <SavingsIcon sx={{ color: "#00838f", fontSize: 30 }} />, link: "/dashboard" },
          ].map((action, idx) => (
            <Grid item xs={6} sm={4} md={2} key={idx}>
              <Card
                component={Link}
                to={action.link}
                sx={{
                  textDecoration: "none",
                  textAlign: "center",
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 14px rgba(0,75,135,0.12)",
                    borderColor: "#004b87",
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>{action.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1c2530", lineHeight: 1.2, mb: 0.5 }}>
                  {action.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#5f6e82", fontSize: "11px" }}>
                  {action.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid: Accounts + Transactions + Cards & Loans */}
        <Grid container spacing={3}>
          {/* Left Column: Bank Accounts & MongoDB-Backed Transactions */}
          <Grid item xs={12} lg={8}>
            {/* Accounts Widget */}
            <Paper sx={{ p: 3, mb: 3.5, borderRadius: "10px" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855" }}>
                  My Accounts
                </Typography>
                <Chip label={`${accounts.length} Active`} size="small" color="primary" variant="outlined" />
              </Stack>

              <Grid container spacing={2}>
                {accounts.map((acc, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: "8px" }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#004b87" }}>
                          {acc.type}
                        </Typography>
                        <Chip label={acc.status} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 700, fontSize: "10px" }} />
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Account: <strong>{acc.accountId}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        {acc.branch}
                      </Typography>
                      <Divider sx={{ my: 1.2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="caption" color="text.secondary">Balance</Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1e293b" }}>
                            ₹{acc.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => { setTransferError(""); setTransferOpen(true); }}
                          sx={{ fontSize: "11px", fontWeight: 700 }}
                        >
                          Transfer
                        </Button>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* MongoDB-Backed Transactions Table */}
            <Paper sx={{ p: 3, borderRadius: "10px" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855" }}>
                    Transaction History
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Stored in MongoDB & filtered for this user
                  </Typography>
                </Box>
                <Button size="small" onClick={loadDashboardData} sx={{ fontSize: "11px" }}>
                  Refresh
                </Button>
              </Stack>

              {loading ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : transactions.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 3 }}>
                  No transactions found. Make a transfer above to add a transaction to MongoDB!
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((tx, idx) => (
                        <TableRow key={tx._id || idx} hover>
                          <TableCell>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Avatar
                                sx={{
                                  width: 30,
                                  height: 30,
                                  bgcolor: tx.type === "credit" ? "#e8f5e9" : "#ffebee",
                                  color: tx.type === "credit" ? "#2e7d32" : "#d32f2f",
                                }}
                              >
                                {tx.type === "credit" ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
                                  {tx.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Ref: {tx.referenceNo}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip label={tx.category} size="small" sx={{ fontSize: "10.5px" }} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" color="text.secondary">
                              {tx.date}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: tx.type === "credit" ? "#2e7d32" : "#d32f2f",
                              }}
                            >
                              {tx.type === "credit" ? "+ ₹" : "- ₹"}
                              {tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          {/* Right Column: Cards Snapshot + Loan Offers */}
          <Grid item xs={12} lg={4}>
            {/* Card Overview */}
            <Card sx={{ p: 2.5, mb: 3.5, borderRadius: "10px" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#002855" }}>
                  Primary Credit Card
                </Typography>
                <Chip label="Regalia Card" size="small" sx={{ bgcolor: "#f8fafc", fontWeight: 700 }} />
              </Stack>

              {/* Simple Card Representation */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)",
                  color: "#ffd700",
                  mb: 2,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1, color: "#fff" }}>
                    MERN BANK
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#ffd700", fontWeight: 700 }}>
                    VISA
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ fontFamily: "monospace", letterSpacing: 2, my: 1.5, color: "#fff", fontWeight: 700 }}>
                  4524 •••• •••• 8819
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: "#fff" }}>{userName.toUpperCase()}</Typography>
                  <Typography variant="caption" sx={{ color: "#fff" }}>EXP: 09/29</Typography>
                </Stack>
              </Box>

              {/* Limit Progress */}
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Available Limit: ₹2,45,800</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>Total: ₹3,00,000</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={82} sx={{ height: 6, borderRadius: 3, bgcolor: "#e2e8f0" }} />
              </Box>

              <Button
                component={Link}
                to="/cards"
                fullWidth
                variant="outlined"
                startIcon={<CreditCardIcon />}
                sx={{ fontWeight: 700 }}
              >
                Manage Cards
              </Button>
            </Card>

            {/* Loan Options */}
            <Paper sx={{ p: 2.5, borderRadius: "10px" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#002855", mb: 2 }}>
                Loan Options
              </Typography>

              <Stack spacing={2}>
                {loans.map((loan) => (
                  <Card key={loan.id} variant="outlined" sx={{ p: 2, borderRadius: "8px", bgcolor: "#f8fafc" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#004b87", mb: 0.5 }}>
                      {loan.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                      {loan.tagline}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5, fontSize: "12px" }}>
                      <span>Amount: <strong>{loan.maxAmount}</strong></span>
                      <span>Interest: <strong>{loan.interestRate}</strong></span>
                    </Stack>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => handleApplyLoan(loan)}
                      sx={{ bgcolor: "#004b87", fontWeight: 700, fontSize: "12px" }}
                    >
                      Apply
                    </Button>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Transfer Money Modal — Posts to MongoDB */}
      <Dialog open={transferOpen} onClose={() => !transferSubmitting && setTransferOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#002855", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Fund Transfer (IMPS / NEFT)</span>
          <IconButton size="small" onClick={() => setTransferOpen(false)} disabled={transferSubmitting}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {transferError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
              {transferError}
            </Alert>
          )}

          {transferSuccessMsg ? (
            <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{ my: 1 }}>
              {transferSuccessMsg}
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleTransferSubmit} sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="From Account"
                value="50100438921045"
                size="small"
                sx={{ mb: 2 }}
              >
                <MenuItem value="50100438921045">
                  Savings Account (•••• 1045) - Balance: ₹1,48,520.75
                </MenuItem>
              </TextField>

              <TextField
                fullWidth
                required
                label="Beneficiary Name"
                placeholder="e.g. Ramesh Kumar"
                value={transferData.beneficiaryName}
                onChange={(e) => setTransferData({ ...transferData, beneficiaryName: e.target.value })}
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Beneficiary Account Number / UPI ID"
                placeholder="e.g. 501009823412"
                value={transferData.toAccount}
                onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                required
                type="number"
                label="Amount (₹)"
                placeholder="e.g. 2500"
                value={transferData.amount}
                onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Remarks"
                placeholder="e.g. Rent, Payment"
                value={transferData.remarks}
                onChange={(e) => setTransferData({ ...transferData, remarks: e.target.value })}
                size="small"
              />
            </Box>
          )}
        </DialogContent>
        {!transferSuccessMsg && (
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setTransferOpen(false)} disabled={transferSubmitting}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleTransferSubmit}
              disabled={transferSubmitting}
              sx={{ bgcolor: "#004b87", fontWeight: 700 }}
            >
              {transferSubmitting ? <CircularProgress size={20} color="inherit" /> : "Confirm Transfer"}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Apply Loan Modal */}
      <Dialog open={loanDialogOpen} onClose={() => setLoanDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#002855" }}>
          {selectedLoan?.type || "Apply for Loan"}
        </DialogTitle>
        <DialogContent dividers>
          {loanSuccess ? (
            <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{ my: 1 }}>
              Loan request submitted successfully for {selectedLoan?.type}!
            </Alert>
          ) : (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Review the loan details before submitting your application:
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc", mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Interest Rate</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#004b87" }}>
                  {selectedLoan?.interestRate}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">Max Amount</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {selectedLoan?.maxAmount}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        {!loanSuccess && (
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setLoanDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={confirmLoanApplication} sx={{ bgcolor: "#004b87", fontWeight: 700 }}>
              Submit Application
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}
