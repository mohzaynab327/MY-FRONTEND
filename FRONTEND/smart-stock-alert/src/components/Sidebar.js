import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Smart Stock</h2>
      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Inventory
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Reports
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
