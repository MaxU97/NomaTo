import classNames from "classnames";
import React, { Children } from "react";
import { CSSTransition } from "react-transition-group";
import { CloseIcon, MoveIcon } from "../../assets/Icons";
import "./sidemenu.scss";

const SideMenu = ({
  toggleMenu = () => {},
  menuOpen = false,
  children,
  title = "Filters",
}) => {
  return (
    <>
      <div
        className={classNames("side-menu-background", menuOpen && "active")}
        onClick={() => {
          toggleMenu(false);
        }}
      ></div>
      <div className={classNames("side-menu", menuOpen && "active")}>
        <MoveIcon
          className="side-menu-close"
          onClick={() => {
            toggleMenu(false);
          }}
        ></MoveIcon>
        <div className="side-menu-title">
          <h1>{title}</h1>
        </div>
        <div className="side-menu-content">{children}</div>
      </div>
    </>
  );
};

export default SideMenu;
