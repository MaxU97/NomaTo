import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import "./slideupmenu.scss";
const SlideUpMenu = ({ toggleMenu = () => {}, menuOpen = true, children }) => {
  const dragRef = useRef();

  const [y, setY] = useState(0);

  useEffect(() => {
    if (menuOpen) {
      setY(0);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  const onDrag = (e) => {
    setY(e.changedTouches[0].clientY);
  };
  const checkClose = (e) => {
    const windowY = window.innerHeight;
    if (e.changedTouches[0].clientY > windowY / 2) {
      toggleMenu(false);
    } else {
      setY(0);
    }
  };

  return (
    <div className={classNames("slide-up", menuOpen && "active")}>
      <div
        className={classNames("slide-up-background", menuOpen && "active")}
        onClick={() => {
          toggleMenu(false);
        }}
      ></div>
      <div
        ref={dragRef}
        className={classNames("slide-up-content ", menuOpen && "active")}
        style={{
          transform: menuOpen ? `translateY(${y / 2}px) ` : "translateY(100%)",
          overflow: "hidden",
        }}
        onTouchMove={onDrag}
        onTouchEnd={checkClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="drag-line"></div>
        {children}
      </div>
    </div>
  );
};

export default SlideUpMenu;
