
import React, { useState } from "react";
import {
  Wallet, CreditCard, TrendingUp, Send,
  Download, Plus, Activity, BarChart3
} from "lucide-react";

import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip
} from "recharts";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";

import {
  initialUser,
  initialTransactions,
  merchantData,
  reports
} from "./data/mockData";

export default function App() {
  const [role, setRole] = useState("individual");
  const [page, setPage] = useState("Overview");
  const [balance, setBalance] = useState(initialUser.balance);
  const [credit] = useState(initialUser.storeCredit);

  const [transactions, setTransactions] =
    useState(initialTransactions);

  const [period, setPeriod] = useState("Monthly");
  const [modal, setModal] = useState(false);

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const isMerchant = role === "merchant";

  const money = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

  function sendMoney(e) {
    e.preventDefault();

    const transferAmount = Number(amount);

    if (
      !recipient.trim() ||
      !Number.isFinite(transferAmount) ||
      transferAmount <= 0 ||
      transferAmount > balance
    ) {
      alert("Please enter a valid recipient and transfer amount.");
      return;
    }

    setBalance((old) => old - transferAmount);

    setTransactions((old) => [
      {
        id: Date.now(),
        name: recipient,
        type: "Money sent",
        amount: -transferAmount,
        date: "Just now",
        status: "Completed"
      },
      ...old
    ]);

    setRecipient("");
    setAmount("");
    setModal(false);
  }

  function receiveMoney() {
    const received = 250;

    setBalance((old) => old + received);

    setTransactions((old) => [
      {
        id: Date.now(),
        name: "Incoming transfer",
        type: "Money received",
        amount: received,
        date: "Just now",
        status: "Completed"
      },
      ...old
    ]);
  }

  const chartData = reports[period];

  return (
    <div className="app">

      <Sidebar
        role={role}
        setRole={setRole}
        page={page}
        setPage={setPage}
      />

      <main className="main">

        <Header page={page} role={role} />

        <section className="welcome">
          <div>
            <h1>Good morning, Jordan ✦</h1>
            <p>
              {isMerchant
                ? "Here's how your business is performing."
                : "Here's what's happening with your money today."
              }
            </p>
          </div>
        </section>

        {page === "Overview" && !isMerchant && (
          <>
            <section className="stats-grid">

              <BalanceCard
                balance={balance}
                accountNumber={initialUser.accountNumber}
              />

              <div className="stat-card">
                <div className="stat-header">
                  <span>Available store credit</span>
                  <CreditCard />
                </div>
                <h2>{money(credit)}</h2>
                <span className="stat-caption">
                  Available to spend
                </span>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Monthly spending</span>
                  <TrendingUp />
                </div>
                <h2>$2,840.50</h2>
                <span className="positive">
                  ↗ 12.5% this month
                </span>
              </div>

            </section>

            <section className="actions-row">
              <button
                className="primary-btn"
                onClick={() => setModal(true)}
              >
                <Send size={17} /> Send money
              </button>

              <button
                className="secondary-btn"
                onClick={receiveMoney}
              >
                <Download size={17} /> Receive $250
              </button>

              <button className="secondary-btn">
                <Plus size={17} /> Add credit
              </button>
            </section>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent activity</h3>
                    <p>Your latest transactions</p>
                  </div>
                </div>

                <TransactionList
                  transactions={transactions}
                />
              </div>

              <div className="panel">
                <h3>Account overview</h3>

                <div className="account-item">
                  <Wallet />
                  <span>Cash balance</span>
                  <b>{money(balance)}</b>
                </div>

                <div className="account-item">
                  <CreditCard />
                  <span>Store credit</span>
                  <b>{money(credit)}</b>
                </div>

                <div className="account-item">
                  <TrendingUp />
                  <span>Total available</span>
                  <b>{money(balance + credit)}</b>
                </div>
              </div>
            </section>
          </>
        )}

        {page === "Overview" && isMerchant && (
          <>
            <section className="merchant-stats stats-grid">

              <div className="stat-card">
                <TrendingUp />
                <h2>{money(merchantData.totalIncome)}</h2>
                <span>Total business income</span>
              </div>

              <div className="stat-card">
                <CreditCard />
                <h2>{money(merchantData.storeCreditUsed)}</h2>
                <span>Store credit used</span>
              </div>

              <div className="stat-card">
                <Wallet />
                <h2>{money(merchantData.availableLoans)}</h2>
                <span>Available business loans</span>
              </div>

              <div className="stat-card">
                <Activity />
                <h2>{merchantData.dailyTransactions}</h2>
                <span>Today's transactions</span>
              </div>

            </section>

            <section className="panel report-panel">
              <div className="panel-heading">
                <div>
                  <h3>Income reports</h3>
                  <p>Business financial performance</p>
                </div>

                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  {Object.keys(reports).map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={money} />
                    <Area
                      dataKey="income"
                      stroke="#7958e8"
                      fill="#e9e2ff"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        )}

        {page === "Activity" && !isMerchant && (
          <section className="panel">
            <h3>All transactions</h3>
            <TransactionList transactions={transactions} />
          </section>
        )}

        {page === "Transactions" && isMerchant && (
          <section className="panel">
            <h3>Merchant transactions</h3>
            <p>Incoming payment monitoring</p>
            <div className="feed-item">
              <span>Emma Wilson</span>
              <strong>+$320.00</strong>
            </div>
            <div className="feed-item">
              <span>James Carter</span>
              <strong>+$185.00</strong>
            </div>
          </section>
        )}

        {page === "Reports" && isMerchant && (
          <section className="panel">
            <h3>Business income reports</h3>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {Object.keys(reports).map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={money} />
                  <Area dataKey="income" stroke="#7958e8" fill="#e9e2ff"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {page === "Loans" && isMerchant && (
          <section className="panel">
            <h2>Available business loans</h2>
            <h1>{money(merchantData.availableLoans)}</h1>
            <p>Flexible business funding.</p>
            <button className="primary-btn">
              Apply for financing
            </button>
          </section>
        )}

        {page === "Cards" && !isMerchant && (
          <section className="panel">
            <BalanceCard
              balance={balance}
              accountNumber={initialUser.accountNumber}
            />
          </section>
        )}

        {page === "Profile" && !isMerchant && (
          <section className="panel">
            <h2>Jordan Davis</h2>
            <p>{initialUser.email}</p>
            <p>Individual account</p>
          </section>
        )}

      </main>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Send money</h2>
              <button onClick={() => setModal(false)}>✕</button>
            </div>

            <form onSubmit={sendMoney}>
              <label>Recipient</label>
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient name or account"
                required
              />

              <label>Amount</label>
              <input
                type="number"
                min="0.01"
                max={balance}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />

              <p>Available balance: {money(balance)}</p>

              <button className="primary-btn" type="submit">
                Confirm transfer
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
