import React, { useState, useRef, useEffect } from "react";

import { useUserContext } from "../../context/user";
import { useTranslation } from "react-i18next";
import "./profilemenu.scss";
import { Link } from "react-router-dom/";
import { apiUrl } from "../../api/config";
const ProfileMenu = () => {
  const { t } = useTranslation();
  const { state, LOGOUT } = useUserContext();

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

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  return (
    <div className="profile-wrapper" ref={ref}>
      <div
        className={
          isOpen ? "profile-wrapper-active open" : "profile-wrapper-active"
        }
      >
        <div className="profile-icon" onClick={() => toggleOpen()}>
          <div style={{ marginRight: "5px" }}> {state.user.name}</div>
          <img src={`${apiUrl + "/" + localStorage.avatarUrl}`}></img>
        </div>
      </div>

      {isOpen && (
        <div className="profile-wrapper-dropdown">
          <Link
            className="profile-item"
            to="/profile"
            onClick={() => toggleOpen()}
          >
            {t("profile-menu.profile")}
          </Link>
          <Link
            to="/bookings"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            {t("profile-menu.my-bookings")}
          </Link>
          <Link
            to="/requests"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            {t("profile-menu.booking-requests")}
          </Link>
          <Link
            to="/list-an-item"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            {t("profile-menu.list-item")}
          </Link>
          {state.user.completionStatus && state.user.sellerCompleted && (
            <Link to="/my-shop" className="profile-item">
              {t("profile-menu.myshop")}
            </Link>
          )}
          <a
            className="profile-item"
            onClick={() => {
              toggleOpen();
              window.dispatchEvent(new Event("support_clicked"));
            }}
          >
            {t("profile-menu.support")}
          </a>

          {state.user.admin && (
            <>
              <hr />
              <Link to="/add-news" className="profile-item">
                {t("profile-menu.admin.add-news")}
              </Link>
              <Link to="/add-categories" className="profile-item">
                {t("profile-menu.admin.add-categories")}
              </Link>
              <Link to="/user-search" className="profile-item">
                {t("profile-menu.admin.user-search")}
              </Link>
            </>
          )}
          <hr />
          <a
            className="profile-item"
            onClick={() => {
              LOGOUT();
              window.location.reload();
            }}
          >
            {t("profile-menu.logout")}
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
