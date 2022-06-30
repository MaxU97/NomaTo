import classNames from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./notification.scss";
export const Context = createContext(false);

export const ConfirmationDialogue = ({ children }) => {
  const [prompt, setPrompt] = useState(false);
  const [show, setShow] = useState(false);

  const confirmBox = (prompt, func) => {
    setPrompt(text);
    setShow(true);
  };

  return (
    <Context.Provider value={{ notification }}>
      <div>
        <CSSTransition
          in={show}
          timeout={300}
          unmountOnExit
          classNames="confirm-dialogue-container"
        >
          <div className="confirm-dialogue">
            <a className="confirm-button">OK</a>
            <a className="decline-button">Cancel</a>
          </div>
        </CSSTransition>
      </div>
    </Context.Provider>
  );
};

export const useConfirmationHandler = () => useContext(Context);
