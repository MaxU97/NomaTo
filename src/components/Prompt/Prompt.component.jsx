import classNames from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import "./prompt.scss";
export const Context = createContext(false);

export const Prompt = ({ children }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [show, setShow] = useState(false);
  const [finalFunction, setFinalFunction] = useState(() => {});

  const prompt = (text, description, fn) => {
    setTitle(text);
    setDescription(description);
    setFinalFunction(() => () => {
      fn();
    });
    setShow(true);
  };

  const Cancel = () => {
    setShow(false);
    resetOptions();
  };

  const Confirm = () => {
    setShow(false);
    finalFunction();
    resetOptions();
  };

  const resetOptions = async () => {
    setTimeout(() => {
      setFinalFunction(() => {});
      setTitle(false);
      setDescription(false);
    }, 500);
  };

  return (
    <Context.Provider value={{ prompt }}>
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames="prompt-animation"
      >
        <div className={classNames("prompt-container", show && "active")}>
          <div className="prompt">
            <div className="prompt-content">
              {title}
              <p>{description}</p>
            </div>

            <div className="prompt-actions">
              <div className="prompt-button confirm" onClick={Confirm}>
                {t("utility.prompt.confirm")}
              </div>
              <div className="prompt-button cancel" onClick={Cancel}>
                {t("utility.prompt.cancel")}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      {children}
    </Context.Provider>
  );
};

export const usePromptHandler = () => useContext(Context);
