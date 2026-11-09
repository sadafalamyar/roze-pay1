
import React from "react";
import { Wallet } from "lucide-react";

export default function BalanceCard({ balance, accountNumber }) {
  const formatted = Number(balance).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <div className="balance-card">
      <div className="card-top">
        <span>Bank account balance</span>
        <Wallet size={21} />
      </div>

      <h1>{formatted}</h1>

      <div className="balance-bottom">
        <span>•••• •••• •••• {accountNumber}</span>
        <span>VISA</span>
      </div>

      <div className="card-glow" />
    </div>
  );
}
