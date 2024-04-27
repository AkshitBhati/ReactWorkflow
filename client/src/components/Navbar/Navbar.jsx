import React from "react";
import logo from "../../assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-branding">
          <img src={logo} alt="Logo" />
          <h1>Workflow</h1>
        </div>
        <button>SignIn</button>
      </div>
    </div>
  );
};

export default Navbar;
