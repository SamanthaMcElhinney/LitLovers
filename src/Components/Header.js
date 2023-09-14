import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png"
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="link">
        <img src={logo} className="logo" alt="LitLovers Logo" />
      </Link>
    </div>
  );
};

export default Header;
