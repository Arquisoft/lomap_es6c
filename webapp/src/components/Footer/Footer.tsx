import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>© Lomap {new Date().getFullYear()}</p>
    </footer>
  );
}
