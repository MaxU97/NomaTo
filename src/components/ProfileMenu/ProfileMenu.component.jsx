import React, { useState, useRef, useEffect } from "react";

import { useUserContext } from "../../context/user";
import { useTranslation } from "react-i18next";
import "./profilemenu.scss";
import { Link } from "react-router-dom/";
import { apiUrl } from "../../api/config";
import { getUnseenRequestCount } from "../../api/booking";
import ProfileUnseenDot from "../ProfileUnseenDot/ProfileUnseenDot.component";
const ProfileMenu = () => {
  const { t } = useTranslation();
  const { state, LOGOUT } = useUserContext();
  const [unseenRequestCount, setUnseenRequestCount] = useState();

  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const isAuthorized = localStorage.token && state.user;
  const isProfileCompleted = isAuthorized && state.user.completionStatus;

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

  useEffect(() => {
    if (!isAuthorized) return;

    const requestUnseen = async () => {
      const data = await getUnseenRequestCount();
      setUnseenRequestCount(data);
    }

    const intervalId = setInterval(async () => {
      await requestUnseen();
    }, 20000)

    requestUnseen();

    return () => {
      clearInterval(intervalId);
    }
  }, [isAuthorized]);

  return (
    <div className="profile-wrapper" ref={ref}>
      <div
        className={
          isOpen ? "profile-wrapper-active open" : "profile-wrapper-active"
        }
      >
        <div className="profile-icon" onClick={() => toggleOpen()}>
          <div className="profile-name">
            {state.user.name || "User"}
            {!!(unseenRequestCount?.myBookings || unseenRequestCount?.bookingRequests)
              ? <ProfileUnseenDot isPulsing />
              : !isProfileCompleted && <ProfileUnseenDot isOrange isPulsing />
            }
          </div>
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
            <span style={{ position: "relative" }}>
              {t("profile-menu.profile")}
              {!isProfileCompleted && <ProfileUnseenDot isOrange />}
            </span>
          </Link>
          <Link
            to="/bookings"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            <span style={{ position: "relative" }}>
              {t("profile-menu.my-bookings")}
              {!!unseenRequestCount?.myBookings && <ProfileUnseenDot />}
            </span>
          </Link>
          <Link
            to="/requests"
            onClick={() => toggleOpen()}
            className="profile-item"
          >
            <span style={{ position: "relative" }}>
              {t("profile-menu.booking-requests")}
              {!!unseenRequestCount?.bookingRequests && <ProfileUnseenDot />}
            </span>
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
              <Link to="/all-news" className="profile-item">
                {t("profile-menu.admin.all-news")}
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
