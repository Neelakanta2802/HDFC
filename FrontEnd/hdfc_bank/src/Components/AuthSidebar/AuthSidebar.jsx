import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import {
  AccountBalanceWalletIcon,
  SendIcon,
  CreditCardIcon,
  ReceiptLongIcon,
  ShieldIcon,
} from "../Icons/HDFCIcons";

export default function AuthSidebar({
  title = "NetBanking Portal",
  subtitle = "Secure full-stack banking application built with React, Node.js, Express, and MongoDB.",
}) {
  const highlights = [
    {
      icon: <AccountBalanceWalletIcon sx={{ color: "#90caf9", fontSize: 22 }} />,
      primary: "Account Overview & Real-Time Balance",
      secondary: "Monitor your savings and current account balances in real time.",
    },
    {
      icon: <SendIcon sx={{ color: "#90caf9", fontSize: 22 }} />,
      primary: "Instant Fund Transfer & Transaction History",
      secondary: "Send money via IMPS/NEFT with records saved directly to MongoDB.",
    },
    {
      icon: <CreditCardIcon sx={{ color: "#90caf9", fontSize: 22 }} />,
      primary: "Credit & Debit Card Management",
      secondary: "View card numbers, manage spend limits, and toggle card security.",
    },
    {
      icon: <ReceiptLongIcon sx={{ color: "#90caf9", fontSize: 22 }} />,
      primary: "Utility BillPay & Recharge Services",
      secondary: "Pay electricity, broadband, mobile, and FASTag bills with instant receipts.",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 3.5, md: 5 },
        color: "#ffffff",
        background: "linear-gradient(145deg, #002855 0%, #004b87 60%, #0060ad 100%)",
        boxShadow: "inset -1px 0 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Top Bank Branding */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              bgcolor: "#ed1c24",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "20px",
              width: 40,
              height: 40,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            M
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: "#fff", lineHeight: 1.1 }}>
              MERN BANK
            </Typography>
            <Typography variant="caption" sx={{ color: "#90caf9", letterSpacing: 0.5, fontSize: "11px" }}>
              Full Stack NetBanking Portal
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", my: 2 }} />

        {/* Section Heading */}
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#ffffff" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#cfe2ff", lineHeight: 1.6, mb: 4, maxWidth: 440 }}>
          {subtitle}
        </Typography>

        {/* Feature Highlights */}
        <Stack spacing={3}>
          {highlights.map((item, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  p: 1,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff", lineHeight: 1.2, mb: 0.3 }}>
                  {item.primary}
                </Typography>
                <Typography variant="caption" sx={{ color: "#b0bec5", lineHeight: 1.4, display: "block" }}>
                  {item.secondary}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Bottom Technology & Security Note */}
      <Box
        sx={{
          mt: 4,
          pt: 2.5,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <ShieldIcon sx={{ color: "#4caf50", fontSize: 24, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "11.5px", lineHeight: 1.4 }}>
          Protected with JSON Web Token (JWT) authentication & bcrypt password hashing. Data persisted in MongoDB.
        </Typography>
      </Box>
    </Box>
  );
}
