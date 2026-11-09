
import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionList({ transactions }) {
  const money = (value) =>
    Math.abs(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <div className="transaction-item" key={transaction.id}>
          <div className={`transaction-icon ${
            transaction.amount > 0 ? "received" : ""
          }`}>
            {transaction.amount > 0
              ? <ArrowDownLeft />
              : <ArrowUpRight />
            }
          </div>

          <div className="transaction-details">
            <strong>{transaction.name}</strong>
            <small>
              {transaction.type} · {transaction.date}
            </small>
          </div>

          <strong className={
            transaction.amount > 0 ? "positive" : ""
          }>
            {transaction.amount > 0 ? "+" : "-"}
            {money(transaction.amount)}
          </strong>
        </div>
      ))}
    </div>
  );
}
