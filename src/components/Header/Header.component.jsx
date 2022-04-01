import React from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "../LanguagePicker/LanguagePicker.component";
import "./header.scss";
import Logo from "../../assets/Logo.png";
const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={Logo}></img>
          </Link>
        </div>
        <div className="menu-wrapper">
          <Link to="/faq">
            <div className="menu-item">FAQ</div>
          </Link>

          <Link to="/rent-an-item">
            <div className="menu-item">Rent an item</div>
          </Link>

          <div className="menu-item lang">
            <LanguagePicker />
          </div>
          <div className="account-menu">
            <Link to="/login">
              <a className="loginButton">Login or Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
