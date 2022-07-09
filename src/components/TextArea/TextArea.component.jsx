import React, { useEffect } from "react";
import { useState, useRef } from "react";
import classNames from "classnames";
import "./textarea.scss";
import { CSSTransition } from "react-transition-group";

import _, { words } from "lodash";
import { useTranslation } from "react-i18next";
const TextArea = ({
  value = "",
  placeholder = "",
  setValue = () => {},
  className = "",
  containerClassName = "",
  textarea = false,
  disabled = false,
  maxCharacters = 800,
  ref = "",
  ...props
}) => {
  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const input = useRef();

  const changeValue = (event) => {
    const wordsLenght = event.target.value.length;
    if (wordsLenght >= maxCharacters) {
      setError(true);
    } else {
      setError(false);
    }

    if (error) {
      if (wordsLenght > maxCharacters) {
        return;
      } else {
        setValue(event.target.value);
      }
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <div className={classNames(className)}>
      <div
        className={classNames(
          "text-area",
          disabled && "disabled",
          containerClassName,
          error && "error"
        )}
        onClick={() => input?.current.focus()}
      >
        <textarea
          type="text"
          ref={input}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
          }}
          placeholder=" "
          value={value}
          onChange={(e) => changeValue(e)}
          autoComplete="nope"
          maxLength={maxCharacters}
          {...props}
        ></textarea>
        {placeholder && !focus && !value && (
          <div className="text-area-placeholder">{placeholder}</div>
        )}
      </div>
      <CSSTransition
        in={error}
        timeout={200}
        unmountOnExit
        classNames="text-error"
      >
        <div className="text-error">
          {t("utility.text-area.maximum")} {maxCharacters}{" "}
          {t("utility.text-area.characters")}{" "}
        </div>
      </CSSTransition>
    </div>
  );
};

export default TextArea;
