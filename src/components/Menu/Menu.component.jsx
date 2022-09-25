import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../../services/responsive.service";
import { MenuIcon } from "../../assets/Icons";
import ProfileMenu from "../ProfileMenu/ProfileMenu.component";
import LanguagePicker from "../LanguagePicker/LanguagePicker.component";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/user";
import "./menu.scss";
import SideMenu from "../SideMenu/SideMenu.component";
import { apiUrl } from "../../api/config";
import { logout } from "../../api/auth";
const Menu = () => {
  const { isMobile } = useWindowDimensions();
  const [mobileMenu, showMobileMenu] = useState(false);
  const { t } = useTranslation();
  const { state, LOGOUT } = useUserContext();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);

  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const toggleOpen = (open) => {
    if (open == null) {
      setOpen(!isOpen);
    } else if (open != null) {
      setOpen(open);
    } else {
    }
  };
  const clickOutside = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    } else {
      toggleOpen(false);
    }
  };
  const logout = () => {
    LOGOUT();
    window.location.reload();
  };

  useEffect(() => {
    isMobile && document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  return isMobile ? (
    <div className="mobile-menu" ref={ref}>
      <div className="menu-item lang">
        <LanguagePicker />
      </div>
      <MenuIcon
        className="mobile-menu-button"
        onClick={() => {
          showMobileMenu(true);
        }}
      ></MenuIcon>
      <SideMenu toggleMenu={showMobileMenu} menuOpen={mobileMenu}>
        <div className="mobile-menu-content">
          <div>
            <div className="mobile-menu-account">
              {localStorage.token && state.user && (
                <>
                  <div className="mobile-menu-account-block">
                    <div className="mobile-menu-account-block-icon">
                      <img
                        src={`${apiUrl + "/" + localStorage.avatarUrl}`}
                      ></img>
                      <div style={{ marginRight: "5px" }}>
                        {" "}
                        {state.user.name}
                      </div>
                    </div>

                    <div className="mobile-menu-account-block-buttons">
                      {state.userBalance && (
                        <Link to="/account-balance">
                          {euroLocale.format(state.userBalance.available / 100)}
                          <span
                            style={{ color: "#a3a3a3" }}
                          >{` (${euroLocale.format(
                            state.userBalance.pending / 100
                          )})`}</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  <Link
                    className="mobile-menu-item"
                    to="/profile"
                    onClick={() => showMobileMenu(false)}
                  >
                    {t("profile-menu.profile")}
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={() => showMobileMenu(false)}
                    className="mobile-menu-item"
                  >
                    {t("profile-menu.my-bookings")}
                  </Link>
                  <Link
                    to="/requests"
                    onClick={() => showMobileMenu(false)}
                    className="mobile-menu-item"
                  >
                    {t("profile-menu.booking-requests")}
                  </Link>
                  <Link
                    to="/list-an-item"
                    onClick={() => showMobileMenu(false)}
                    className="mobile-menu-item"
                  >
                    {t("profile-menu.list-item")}
                  </Link>
                  {state.user.completionStatus && (
                    <Link to="/my-shop" className="mobile-menu-item">
                      {t("profile-menu.myshop")}
                    </Link>
                  )}
                  {state.user.admin && (
                    <>
                      <Link
                        to="/add-categories"
                        className="mobile-menu-item"
                        onClick={() => showMobileMenu(false)}
                      >
                        {t("profile-menu.admin.add-categories")}
                      </Link>
                      <Link
                        to="/add-news"
                        className="mobile-menu-item"
                        onClick={() => showMobileMenu(false)}
                      >
                        {t("profile-menu.admin.add-news")}
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
            <Link to="/search" onClick={() => showMobileMenu(false)}>
              <div className="mobile-menu-item">{t("header.search")}</div>
            </Link>
            <Link to="/faq" onClick={() => showMobileMenu(false)}>
              <div
                className="mobile-menu-item"
                style={{ borderBottom: "none" }}
              >
                {t("header.FAQ")}
              </div>
            </Link>
          </div>
          {localStorage.token && state.user ? (
            <a
              className="mobile-menu-log-button"
              onClick={() => {
                showMobileMenu(false);
                setTimeout(() => {
                  logout();
                }, 300);
              }}
            >
              {t("profile-menu.logout")}
            </a>
          ) : (
            <Link
              className="mobile-menu-log-button"
              to="/login"
              onClick={() => showMobileMenu(false)}
            >
              {t("header.login-signup")}
            </Link>
          )}
        </div>
      </SideMenu>
    </div>
  ) : (
    <div className="menu-wrapper">
      <div className="menu-wrapper">
        <Link to="/faq">
          <div className="menu-item">{t("header.FAQ")}</div>
        </Link>

        <Link to="/list-an-item">
          <div className="menu-item">{t("header.list-an-item")}</div>
        </Link>

        <div className="menu-item lang">
          <LanguagePicker />
        </div>

        {state.user.completionStatus && state.userBalance && (
          <Link to="/account-balance" className="menu-item">
            {euroLocale.format(state.userBalance.available / 100)}
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
  );
};

export default Menu;
