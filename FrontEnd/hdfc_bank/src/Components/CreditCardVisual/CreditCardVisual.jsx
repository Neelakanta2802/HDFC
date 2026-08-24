import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip, Stack } from "@mui/material";
import { Visibility, VisibilityOff, ContactlessIcon } from "../Icons/HDFCIcons";

export default function CreditCardVisual({
  cardName = "HDFC Regalia Gold",
  cardNumber = "4524 •••• •••• 8819",
  cardHolder = "HARISH KUMAR",
  expiry = "09/29",
  network = "VISA SIGNATURE",
  cardGradient = "linear-gradient(135deg, #1b263b 0%, #0d1b2a 50%, #415a77 100%)",
  textColor = "#ffd700",
  cvv = "842",
}) {
  const [showDetails, setShowDetails] = useState(false);

  const displayCardNumber = showDetails
    ? cardNumber.replace(/•••• ••••/g, "5892 4108")
    : cardNumber;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 380,
        height: 220,
        borderRadius: "16px",
        background: cardGradient,
        color: textColor,
        p: 2.5,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 36px rgba(0,0,0,0.45)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-30%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Top Row: Bank Brand + Card Name + Contactless */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 900,
              letterSpacing: 2,
              color: "#ffffff",
              display: "block",
              fontSize: "12px",
            }}
          >
            HDFC BANK
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: 0.5,
            }}
          >
            {cardName}
          </Typography>
        </Box>
        <ContactlessIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 26 }} />
      </Stack>

      {/* Middle Row: EMV Gold Chip & Show/Hide Eye */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 0.5 }}>
        {/* Realistic EMV Chip */}
        <Box
          sx={{
            width: 44,
            height: 32,
            borderRadius: "6px",
            background: "linear-gradient(135deg, #ffd700 0%, #b8860b 50%, #ffe082 100%)",
            border: "1px solid #996515",
            position: "relative",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              bgcolor: "#996515",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              bgcolor: "#996515",
            },
          }}
        />

        <Tooltip title={showDetails ? "Hide Card Details" : "Show Full Card Number"}>
          <IconButton
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            sx={{ color: "rgba(255,255,255,0.85)", bgcolor: "rgba(0,0,0,0.2)" }}
          >
            {showDetails ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Embossed Card Number */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Courier New", Courier, monospace',
          letterSpacing: 3,
          fontWeight: 700,
          color: "#ffffff",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          fontSize: { xs: "16px", sm: "18px" },
        }}
      >
        {displayCardNumber}
      </Typography>

      {/* Bottom Row: Card Holder + Expiry + CVV + Network */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", display: "block" }}>
            CARD HOLDER
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, letterSpacing: 1, color: "#ffffff", fontSize: "12px" }}>
            {cardHolder}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", display: "block" }}>
            EXPIRES
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "12px" }}>
            {expiry}
          </Typography>
        </Box>

        {showDetails && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", display: "block" }}>
              CVV
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffd54f", fontSize: "12px" }}>
              {cvv}
            </Typography>
          </Box>
        )}

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: 1,
            color: "#ffffff",
            fontSize: "13px",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {network}
        </Typography>
      </Stack>
    </Box>
  );
}
