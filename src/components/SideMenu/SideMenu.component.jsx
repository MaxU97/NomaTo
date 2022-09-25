import classNames from "classnames";
import React, { Children, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { CloseIcon, MoveIcon } from "../../assets/Icons";
import "./sidemenu.scss";

const SideMenu = ({ toggleMenu = () => {}, menuOpen = false, children }) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);
  return (
    <div className={classNames("side-menu", menuOpen && "active")}>
      <div
        className={classNames("side-menu-background", menuOpen && "active")}
        onClick={() => {
          toggleMenu(false);
        }}
      ></div>
      <div className={classNames("side-menu-content", menuOpen && "active")}>
        {children}
      </div>
    </div>
  );
};

export default SideMenu;
