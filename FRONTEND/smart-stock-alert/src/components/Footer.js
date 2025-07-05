// src/components/Footer.js
import React from "react";
import "./HeaderFooter.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Smart Stock. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
