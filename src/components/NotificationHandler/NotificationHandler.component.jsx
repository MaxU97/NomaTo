import classNames from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./notification.scss";
export const Context = createContext(false);

export const NotificationHandler = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [zIndex, setZIndex] = useState();
  const notification = (text, error = false, z) => {
    setAlert(text);
    setError(error);
    setShow(true);
    if (z) {
      setZIndex(z);
    }
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setAlert("");
      }, 300);
    }
  }, [show]);

  return (
    <Context.Provider value={{ notification }}>
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames="notification-container"
      >
        <div
          className={classNames("notification", error && "error")}
          style={zIndex && { zIndex: zIndex }}
        >
          {alert[0]}
        </div>
      </CSSTransition>
      {children}
    </Context.Provider>
  );
};

export const useNotificationHandler = () => useContext(Context);
