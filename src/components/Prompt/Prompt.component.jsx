import classNames from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import Input from "../Input/Input.component";
import "./prompt.scss";
export const Context = createContext(false);

export const Prompt = ({ children }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [textfield, setTextfield] = useState(false);
  const [show, setShow] = useState(false);
  const [finalFunction, setFinalFunction] = useState(() => {});

  const [inputValue, setInputValue] = useState();
  const [inputError, setInputError] = useState();
  const [inputType, setInputType] = useState();
  const prompt = (text, description, textfield, fn, type) => {
    setTitle(text);
    setDescription(description);
    setFinalFunction((e) => (e) => {
      fn(e);
    });
    setTextfield(textfield);
    setInputType(type);
    setShow(true);
  };

  const Cancel = () => {
    setShow(false);
    resetOptions();
  };

  const Confirm = () => {
    if (textfield && !inputValue.trim()) {
      setInputError(t("utility.prompt.fill-field"));
      return;
    }
    setShow(false);
    finalFunction(inputValue);
    resetOptions();
  };

  const changeInputValue = (e) => {
    setInputValue(e);
    setInputError();
  };

  const resetOptions = async () => {
    setTimeout(() => {
      setFinalFunction(() => {});
      setTitle(false);
      setDescription(false);
      setTextfield(false);
      setInputValue();
      setInputError();
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
            <div
              className={classNames("prompt-content", textfield && "textfield")}
            >
              {title}
              <p>{description}</p>
              {textfield && (
                <Input
                  value={inputValue}
                  setValue={changeInputValue}
                  error={inputError}
                  errorText={inputError}
                  type={inputType}
                ></Input>
              )}
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
