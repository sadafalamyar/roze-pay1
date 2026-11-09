
export const initialUser = {
  name: "Jordan Davis",
  email: "jordan@example.com",
  accountNumber: "4829",
  balance: 12480.50,
  storeCredit: 3500,
  creditLimit: 5000
};

export const initialTransactions = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Transfer received",
    amount: 250,
    date: "Today, 10:42 AM",
    status: "Completed"
  },
  {
    id: 2,
    name: "Amazon Store",
    type: "Online purchase",
    amount: -85.50,
    date: "Today, 9:15 AM",
    status: "Completed"
  },
  {
    id: 3,
    name: "Michael Brown",
    type: "Money sent",
    amount: -120,
    date: "Yesterday",
    status: "Completed"
  }
];

export const merchantData = {
  totalIncome: 48295,
  storeCreditUsed: 12450,
  availableLoans: 35000,
  dailyTransactions: 128
};

export const reports = {
  Monthly: [
    { name: "Jun", income: 8200 },
    { name: "Jul", income: 10500 },
    { name: "Aug", income: 9800 },
    { name: "Sep", income: 13200 },
    { name: "Oct", income: 11900 },
    { name: "Nov", income: 15400 }
  ],
  "Bi-monthly": [
    { name: "Jan-Feb", income: 18000 },
    { name: "Mar-Apr", income: 22000 },
    { name: "May-Jun", income: 19500 },
    { name: "Jul-Aug", income: 24500 },
    { name: "Sep-Oct", income: 27000 },
    { name: "Nov-Dec", income: 15400 }
  ],
  Quarterly: [
    { name: "Q1", income: 42000 },
    { name: "Q2", income: 51000 },
    { name: "Q3", income: 58000 },
    { name: "Q4", income: 47000 }
  ],
  Yearly: [
    { name: "2022", income: 120000 },
    { name: "2023", income: 158000 },
    { name: "2024", income: 192000 },
    { name: "2025", income: 235000 },
    { name: "2026", income: 198000 }
  ]
};
