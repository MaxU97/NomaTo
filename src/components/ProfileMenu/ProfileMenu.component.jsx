import React, { useState, useRef, useEffect } from "react";

import { useUserContext } from "../../context/user";
import { useTranslation } from "react-i18next";
import "./profilemenu.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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
          <Link className="profile-item">{t("profile-menu.profile")}</Link>
          <Link className="profile-item">{t("profile-menu.inbox")}</Link>
          <Link className="profile-item">{t("profile-menu.rentals")}</Link>
          <Link
            to="/list-an-item"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            {t("profile-menu.list-item")}
          </Link>
          <Link className="profile-item">{t("profile-menu.myshop")}</Link>
          {state.user.admin && (
            <>
              <hr />
              <Link to="/add-news" className="profile-item">
                {t("profile-menu.admin.add-news")}
              </Link>
            </>
          )}
          <hr />
          <a
            className="profile-item"
            onClick={() => {
              LOGOUT();
            }}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;