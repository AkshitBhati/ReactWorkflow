import React from "react";
import logo from "../../assets/logo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-branding">
          <img src={logo} alt="Logo" />
          <h1>Workflow</h1>
        </div>
        <Link to={currentUser ? "/profile" : "/signin"}><button>{currentUser ? currentUser.username : "Signin"}</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
