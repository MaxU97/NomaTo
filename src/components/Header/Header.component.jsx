import React from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "../LanguagePicker/LanguagePicker.component";
import "./header.scss";
import Logo from "../../assets/Logo-1.png";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/user";
import ProfileMenu from "../ProfileMenu/ProfileMenu.component";

const Header = () => {
  const { t } = useTranslation();
  const { state } = useUserContext();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
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
          {state.user.sellerCompleted ? (
            <Link to="/list-an-item">
              <div className="menu-item">{t("header.list-an-item")}</div>
            </Link>
          ) : (
            <Link to="/become-a-lender">
              <div className="menu-item">{t("header.become-a-lender")}</div>
            </Link>
          )}

          <div className="menu-item lang">
            <LanguagePicker />
          </div>

          {state.user.sellerCompleted && state.userBalance && (
            <Link to="/account-balance" className="menu-item">
              {euroLocale.format(state.userBalance.available)}
              <span style={{ color: "#a3a3a3" }}>{` (${euroLocale.format(
                state.userBalance.pending / 100
              )})`}</span>
            </Link>
          )}

          <div className="account-menu">
            {localStorage.token && state.user ? (
              <ProfileMenu></ProfileMenu>
            ) : (
              <Link className="login-button" to="/login">
                {t("header.login-signup")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
