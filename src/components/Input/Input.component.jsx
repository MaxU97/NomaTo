import React from "react";
import { useState, useRef } from "react";
import classNames from "classnames";
import "./input.scss";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import _, { delay } from "lodash";
const Input = ({
  value = "",
  placeholder = "",
  setValue = () => {},
  className = "",
  button = false,
  buttonText = "Null",
  inputButton = () => {},
  textarea = false,
  disabled = false,
  tooltipMessage = "",
  animatePlaceholder = true,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [focusDebounced, setFocusDebounced] = useState(false);
  const input = useRef();
  const delayedFocus = _.debounce((focus) => setFocusDebounced(focus), 200);

  const followTooltipLink = (e) => {
    console.log(e);
  };

  return (
    <div
      className={classNames(
        className,
        focusDebounced && !!tooltipMessage && "tooltip-shown"
      )}
    >
      <div
        className={classNames("input", disabled && "disabled")}
        onClick={() => input?.current.focus()}
      >
        {textarea ? (
          <textarea
            type="text"
            ref={input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder=" "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
          ></textarea>
        ) : (
          <input
            type="text"
            ref={input}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
              delayedFocus(false);
            }}
            placeholder=" "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            {...props}
          ></input>
        )}
        {animatePlaceholder
          ? placeholder && (
              <div className="input-placeholder">{placeholder}</div>
            )
          : placeholder &&
            !focus &&
            !value && (
              <div className="input-placeholder-static">{placeholder}</div>
            )}
        {button && (
          <a className="input-button" onClick={() => inputButton()}>
            <div>{buttonText}</div>
          </a>
        )}
      </div>
      {tooltipMessage && (
        <CSSTransition
          in={focus}
          timeout={200}
          unmountOnExit
          classNames="input-tooltip"
        >
          <div className="input-tooltip">
            <div className="input-tooltip-container">{tooltipMessage}</div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default Input;
