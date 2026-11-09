import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  Download,
  ShieldCheck,
  Zap,
  Building2
} from 'lucide-react';

export default function MerchantDashboard() {
  const [timeframe, setTimeframe] = useState('monthly'); // 'monthly', 'yearly'

  // Merchant analytics data
  const merchantData = {
    monthly: {
      revenue: "$48,250.00",
      storeCreditReceived: "$12,400.00",
      storeCreditUsed: "$8,900.00",
      growth: "+14.2%"
    },
    yearly: {
      revenue: "$542,100.00",
      storeCreditReceived: "$145,000.00",
      storeCreditUsed: "$112,300.00",
      growth: "+22.8%"
    }
  };

  const activeStats = merchantData[timeframe];

  // Business loan data
  const loanInfo = {
    approvedLimit: "$50,000.00",
    activeLoanBalance: "$12,500.00",
    interestRate: "6.5% APR",
    status: "Eligible for credit line expansion"
  };

  // Detailed transaction list
  const merchantTransactions = [
    { id: 1, cust
