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
  Divider,
  Switch,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CreditCardIcon,
  SecurityIcon,
  LockResetIcon,
  CheckCircleOutlineIcon,
  BlockIcon,
  RedeemIcon,
} from "../Icons/HDFCIcons";
import CreditCardVisual from "../CreditCardVisual/CreditCardVisual";
import api from "../../services/api";

export default function CardsData() {
  const [cards, setCards] = useState([]);
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Card Controls State
  const [onlineSpends, setOnlineSpends] = useState(true);
  const [internationalSpends, setInternationalSpends] = useState(false);
  const [contactless, setContactless] = useState(true);
  const [atmWithdrawals, setAtmWithdrawals] = useState(true);
  const [cardBlocked, setCardBlocked] = useState(false);
  const [domesticLimit, setDomesticLimit] = useState(150000);

  // Dialogs
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const res = await api.get("/api/cards");
        setCards(res.data.data || []);
      } catch (err) {
        console.error("Error loading cards:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  const currentCard = cards[selectedCardIdx] || {
    cardName: "Credit Card",
    cardNumber: "4524 •••• •••• 8819",
    cardType: "Credit Card",
    cardHolder: "USER",
    expiry: "09/29",
    creditLimit: 300000,
    availableLimit: 245800,
    rewardPoints: "14,250 Pts",
    cardGradient: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 50%, #415a77 100%)",
    textColor: "#ffd700",
    network: "VISA",
    features: [
      "Airport Lounge Access",
      "4 Reward Points for every ₹150 spent",
      "Low 2% Foreign Currency Markup fee",
    ],
  };

  const handleSetPin = () => {
    if (newPin.length !== 4 || newPin !== confirmPin) {
      setSnackbarMsg("PIN must be 4 digits and match the confirmation field.");
      return;
    }
    setPinDialogOpen(false);
    setNewPin("");
    setConfirmPin("");
    setSnackbarMsg("Card PIN updated successfully.");
  };

  return (
    <Box sx={{ bgcolor: "#f4f7fb", minHeight: "calc(100vh - 64px)", py: 4 }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#002855" }}>
              Cards Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your Credit & Debit cards, limits, and security settings
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<BlockIcon />}
              onClick={() => {
                setCardBlocked(!cardBlocked);
                setSnackbarMsg(cardBlocked ? "Card unblocked." : "Card temporarily blocked.");
              }}
              sx={{ fontWeight: 700 }}
            >
              {cardBlocked ? "Unblock Card" : "Block Card"}
            </Button>
            <Button
              variant="contained"
              startIcon={<LockResetIcon />}
              onClick={() => setPinDialogOpen(true)}
              sx={{ bgcolor: "#004b87", fontWeight: 700 }}
            >
              Set PIN
            </Button>
          </Stack>
        </Stack>

        {cardBlocked && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
            <strong>Card Blocked:</strong> Transactions are temporarily paused on this card. Click "Unblock Card" to reactivate.
          </Alert>
        )}

        {/* Card Selector Tabs */}
        <Paper sx={{ mb: 3.5, borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <Tabs
            value={selectedCardIdx}
            onChange={(e, val) => setSelectedCardIdx(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              "& .MuiTab-root": {
                fontWeight: 700,
                textTransform: "none",
                fontSize: "13.5px",
                py: 1.5,
              },
            }}
          >
            {cards.map((c, i) => (
              <Tab
                key={i}
                icon={<CreditCardIcon fontSize="small" />}
                iconPosition="start"
                label={`${c.cardName} (${c.cardType})`}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Main Grid: Card Preview + Controls & Limits */}
        <Grid container spacing={3.5}>
          {/* Left Column: Card Visual + Reward Points */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <CreditCardVisual
                cardName={currentCard.cardName}
                cardNumber={currentCard.cardNumber}
                cardHolder={currentCard.cardHolder}
                expiry={currentCard.expiry}
                network={currentCard.network}
                cardGradient={currentCard.cardGradient}
                textColor={currentCard.textColor}
              />
            </Box>

            {/* Limits & Balance */}
            <Paper sx={{ p: 3, borderRadius: "10px", mb: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#002855" }}>
                  Card Limits & Points
                </Typography>
                <Chip
                  icon={<RedeemIcon sx={{ "&&": { color: "#b78103", fontSize: "16px" } }} />}
                  label={currentCard.rewardPoints || "5,000 Pts"}
                  sx={{ bgcolor: "#fff8e1", color: "#b78103", fontWeight: 700 }}
                />
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Total Limit</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>
                    ₹{(currentCard.creditLimit || currentCard.dailyLimit || 100000).toLocaleString("en-IN")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Available Limit</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#2e7d32" }}>
                    ₹{(currentCard.availableLimit || 85000).toLocaleString("en-IN")}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Features */}
            <Paper sx={{ p: 3, borderRadius: "10px" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#002855", mb: 1.5 }}>
                Card Features
              </Typography>
              <List disablePadding>
                {(currentCard.features || []).map((feat, idx) => (
                  <ListItem key={idx} disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#2e7d32", fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={feat} primaryTypographyProps={{ fontSize: "13px", color: "#334155" }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column: Spend Limits & Toggles */}
          <Grid item xs={12} lg={7}>
            <Paper sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: "10px" }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                <SecurityIcon sx={{ color: "#004b87", fontSize: 26 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#002855" }}>
                    Transaction Limits & Usage Settings
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Configure daily transaction limits and channel preferences
                  </Typography>
                </Box>
              </Stack>

              {/* Daily Limit Slider */}
              <Box sx={{ mb: 3.5, p: 2.5, bgcolor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>
                    Daily Usage Limit
                  </Typography>
                  <Chip
                    label={`₹${domesticLimit.toLocaleString("en-IN")}`}
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: "12px" }}
                  />
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
                  Adjust maximum daily spending limit.
                </Typography>
                <Slider
                  value={domesticLimit}
                  min={1000}
                  max={currentCard.creditLimit || 300000}
                  step={5000}
                  onChange={(e, val) => setDomesticLimit(val)}
                  valueLabelDisplay="auto"
                  sx={{ color: "#004b87" }}
                />
              </Box>

              {/* Toggles */}
              <Grid container spacing={2}>
                {[
                  {
                    title: "Online Domestic E-Commerce",
                    desc: "Allow online payments on shopping websites",
                    state: onlineSpends,
                    setter: setOnlineSpends,
                  },
                  {
                    title: "Contactless Tap & Pay",
                    desc: "Enable tap payments on point-of-sale machines",
                    state: contactless,
                    setter: setContactless,
                  },
                  {
                    title: "ATM Cash Withdrawals",
                    desc: "Allow cash withdrawals at ATM terminals",
                    state: atmWithdrawals,
                    setter: setAtmWithdrawals,
                  },
                  {
                    title: "International Transactions",
                    desc: "Enable international currency transactions",
                    state: internationalSpends,
                    setter: setInternationalSpends,
                  },
                ].map((item, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "8px",
                        bgcolor: item.state ? "#ffffff" : "#f8fafc",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ pr: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b", lineHeight: 1.2, mb: 0.3 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "11px" }}>
                            {item.desc}
                          </Typography>
                        </Box>
                        <Switch
                          checked={item.state}
                          onChange={(e) => {
                            item.setter(e.target.checked);
                            setSnackbarMsg(`${item.title} ${e.target.checked ? "enabled" : "disabled"}.`);
                          }}
                          color="primary"
                        />
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Set PIN Dialog */}
      <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#002855" }}>
          Set Card PIN
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter a new 4-digit PIN for your {currentCard.cardName}.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="New 4-Digit PIN"
            inputProps={{ maxLength: 4 }}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm 4-Digit PIN"
            inputProps={{ maxLength: 4 }}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPinDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSetPin} sx={{ bgcolor: "#004b87", fontWeight: 700 }}>
            Save PIN
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar alerts */}
      <Snackbar
        open={Boolean(snackbarMsg)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMsg("")}
        message={snackbarMsg}
      />
    </Box>
  );
}
