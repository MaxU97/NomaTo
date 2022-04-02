import React from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "../LanguagePicker/LanguagePicker.component";
import "./header.scss";
import Logo from "../../assets/Logo-1.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
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
            <div className="menu-item">{t("header.FAQ")}</div>
          </Link>

          <Link to="/rent-an-item">
            <div className="menu-item">{t("header.rent-item")}</div>
          </Link>

          <div className="menu-item lang">
            <LanguagePicker />
          </div>
          <div className="account-menu">
            <Link to="/login">
              <a className="loginButton">{t("header.login-signup")}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
