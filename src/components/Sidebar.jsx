
import React from "react";
import {
  Home, Activity, CreditCard, User,
  BarChart3, Briefcase, Store
} from "lucide-react";

export default function Sidebar({
  role,
  setRole,
  page,
  setPage
}) {
  const isMerchant = role === "merchant";

  const links = isMerchant
    ? [
        { name: "Overview", icon: Home },
        { name: "Transactions", icon: Activity },
        { name: "Reports", icon: BarChart3 },
        { name: "Loans", icon: Briefcase }
      ]
    : [
        { name: "Overview", icon: Home },
        { name: "Activity", icon: Activity },
        { name: "Cards", icon: CreditCard },
        { name: "Profile", icon: User }
      ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">R</div>
        <span>roze<span className="brand-light">pay</span></span>
      </div>

      <div className="role-label">WORKSPACE</div>

      <div className="role-switch">
        <button
          className={!isMerchant ? "selected" : ""}
          onClick={() => {
            setRole("individual");
            setPage("Overview");
          }}
        >
          <User size={17} /> Personal
        </button>

        <button
          className={isMerchant ? "selected" : ""}
          onClick={() => {
            setRole("merchant");
            setPage("Overview");
          }}
        >
          <Store size={17} /> Merchant
        </button>
      </div>

      <div className="role-label">MENU</div>

      <nav>
        {links.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`nav-item ${page === name ? "active" : ""}`}
            onClick={() => setPage(name)}
          >
            <Icon size={19} />
            {name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
