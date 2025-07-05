// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Report from "./components/Report";
import Login from "./components/Login";

// Layout bila Header/Footer
function LayoutWithSidebar({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <LayoutWithSidebar>
              <Dashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/inventory"
          element={
            <LayoutWithSidebar>
              <Inventory />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/report"
          element={
            <LayoutWithSidebar>
              <Report />
            </LayoutWithSidebar>
          }
        />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
