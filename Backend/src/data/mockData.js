// Mock User Data
const user = {
  id: 1,
  name: "Harish Kumar",
  lastLogin: new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

// Mock Accounts Data
const accounts = [
  {
    accountId: "50100438921045",
    type: "Savings Max Account",
    branch: "HDFC Bank - Cyber City Branch",
    balance: 148520.75,
    currency: "INR",
    status: "Active",
    ifsc: "HDFC0001234",
  },
  {
    accountId: "50200891230491",
    type: "Current Advantage Account",
    branch: "HDFC Bank - MG Road Branch",
    balance: 425600.0,
    currency: "INR",
    status: "Active",
    ifsc: "HDFC0005678",
  },
];

// Bills Data
const bills = [
  {
    billId: "BILL-10921",
    billerName: "TSSPDCL Southern Power",
    type: "Electricity",
    amount: 2450.0,
    dueDate: "10-Sep-2026",
    status: "Due Soon",
    consumerNumber: "1094827104",
  },
  {
    billId: "BILL-20481",
    billerName: "Airtel Postpaid Mobile",
    type: "Mobile Postpaid",
    amount: 899.0,
    dueDate: "05-Sep-2026",
    status: "Due Soon",
    consumerNumber: "9876543210",
  },
  {
    billId: "BILL-30912",
    billerName: "ACT Fibernet Broadband",
    type: "Broadband",
    amount: 1179.0,
    dueDate: "15-Sep-2026",
    status: "Unpaid",
    consumerNumber: "HYD-998812",
  },
  {
    billId: "BILL-40192",
    billerName: "HDFC FASTag Auto-Topup",
    type: "FASTag",
    amount: 1000.0,
    dueDate: "Auto Debit Enabled",
    status: "Paid",
    consumerNumber: "MH02CB1234",
  },
];

// Insurance Data
const insurance = [
  {
    id: 1,
    title: "HDFC ERGO Optima Secure Health Insurance",
    description: "4X coverage with zero deduction & instant cashless claims across 12,000+ hospitals.",
    sumInsured: "₹10,00,000",
    premium: "₹850/month",
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "HDFC Life Click 2 Protect Super",
    description: "Comprehensive term life cover with return of premium option and critical illness benefit.",
    sumInsured: "₹1,00,00,000",
    premium: "₹1,200/month",
    badge: "Tax Saver",
  },
  {
    id: 3,
    title: "HDFC ERGO Motor Insurance",
    description: "Zero depreciation cover with roadside assistance & paperless spot settlement.",
    sumInsured: "Market IDV",
    premium: "₹4,500/year",
    badge: "Instant Policy",
  },
];

// Cards Data with detailed specs
const cards = [
  {
    id: 1,
    cardName: "HDFC Regalia Gold Credit Card",
    cardNumber: "4524 •••• •••• 8819",
    cardType: "Credit Card",
    variant: "regalia-gold",
    network: "VISA SIGNATURE",
    cardHolder: "HARISH KUMAR",
    expiry: "09/29",
    creditLimit: 300000,
    availableLimit: 245800,
    rewardPoints: "14,250 Pts",
    cardGradient: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 50%, #415a77 100%)",
    textColor: "#ffd700",
    features: [
      "Club Vistara Silver Tier & MMT Black Elite Membership",
      "Complimentary Airport Lounge Access across 1000+ lounges",
      "4 Reward Points for every ₹150 spent",
      "Low 2% Foreign Currency Markup fee",
    ],
  },
  {
    id: 2,
    cardName: "HDFC Millennia Credit Card",
    cardNumber: "5241 •••• •••• 4102",
    cardType: "Credit Card",
    variant: "millennia",
    network: "MASTERCARD WORLD",
    cardHolder: "HARISH KUMAR",
    expiry: "11/28",
    creditLimit: 150000,
    availableLimit: 118450,
    rewardPoints: "3,820 CashPoints",
    cardGradient: "linear-gradient(135deg, #002855 0%, #004b87 50%, #0077b6 100%)",
    textColor: "#ffffff",
    features: [
      "5% CashBack on Amazon, Flipkart, Swiggy, Zomato & Myntra",
      "1% CashBack on all other online and offline spends",
      "8 Complimentary Domestic Airport Lounge Visits per year",
      "1% Fuel Surcharge waiver across all fuel stations",
    ],
  },
  {
    id: 3,
    cardName: "HDFC EasyShop Platinum Debit Card",
    cardNumber: "4111 •••• •••• 9921",
    cardType: "Debit Card",
    variant: "easyshop",
    network: "VISA PLATINUM",
    cardHolder: "HARISH KUMAR",
    expiry: "04/30",
    dailyLimit: 100000,
    availableLimit: 100000,
    rewardPoints: "1,200 Pts",
    cardGradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    textColor: "#ffffff",
    features: [
      "Up to 1% CashBack on everyday debit card spends",
      "Daily domestic ATM withdrawal limit of ₹1,00,000",
      "Complimentary Accidental Death Cover of ₹12 Lakhs",
      "Zero liability on lost or stolen card upon immediate reporting",
    ],
  },
];

// Loans Data
const loans = [
  {
    id: 1,
    type: "HDFC Instant Personal Loan",
    tagline: "Pre-approved loan in 10 seconds with zero paperwork",
    maxAmount: "Up to ₹40,00,000",
    interestRate: "10.50% p.a.",
    tenure: "12 to 72 Months",
    emiStartsAt: "₹2,149 per Lakh",
  },
  {
    id: 2,
    type: "HDFC Express Home Loan",
    tagline: "Own your dream home with attractive interest rates",
    maxAmount: "Up to ₹10 Crores",
    interestRate: "8.40% p.a.",
    tenure: "Up to 30 Years",
    emiStartsAt: "₹762 per Lakh",
  },
  {
    id: 3,
    type: "Two-Wheeler & EV Loan",
    tagline: "Drive home your favorite bike with up to 100% funding",
    maxAmount: "100% On-Road Price",
    interestRate: "9.99% p.a.",
    tenure: "Up to 48 Months",
    emiStartsAt: "₹2,536 per Lakh",
  },
];

// Mock Transactions
const transactions = [
  {
    id: "TXN-902184",
    title: "Amazon India Online Purchase",
    category: "Shopping",
    date: "23 Aug 2026, 04:30 PM",
    amount: 3499.0,
    type: "debit",
    status: "Success",
    referenceNo: "REF78219401",
  },
  {
    id: "TXN-902183",
    title: "Salary Credit - TechCorp Solutions",
    category: "Salary",
    date: "20 Aug 2026, 09:15 AM",
    amount: 95000.0,
    type: "credit",
    status: "Success",
    referenceNo: "NEFT88129034",
  },
  {
    id: "TXN-902182",
    title: "Swiggy Food Delivery",
    category: "Food & Dining",
    date: "19 Aug 2026, 08:45 PM",
    amount: 640.0,
    type: "debit",
    status: "Success",
    referenceNo: "UPI89123049",
  },
  {
    id: "TXN-902181",
    title: "UPI Transfer to Harish Friends",
    category: "Transfer",
    date: "18 Aug 2026, 02:10 PM",
    amount: 2500.0,
    type: "debit",
    status: "Success",
    referenceNo: "UPI10928374",
  },
  {
    id: "TXN-902180",
    title: "Dividend Payout - HDFC Mutual Fund",
    category: "Investments",
    date: "15 Aug 2026, 11:00 AM",
    amount: 4850.0,
    type: "credit",
    status: "Success",
    referenceNo: "DIV44891023",
  },
];

module.exports = {
  user,
  accounts,
  bills,
  insurance,
  cards,
  loans,
  transactions,
};
