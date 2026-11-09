
import React from "react";
import { Bell } from "lucide-react";

export default function Header({ page, role }) {
  return (
    <header className="topbar">
      <div>
        <span className="breadcrumb">
          Roze Pay / {role}
        </span>
        <h2>{page}</h2>
      </div>

      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>
        <div className="avatar">JD</div>
      </div>
    </header>
  );
}
