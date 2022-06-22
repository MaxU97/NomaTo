import React from "react";
import { useState, useRef } from "react";
import classNames from "classnames";
import "./input.scss";
import { CSSTransition } from "react-transition-group";
import _ from "lodash";
const Input = ({
  value = "",
  placeholder = "",
  setValue = () => {},
  className = "",
  button = false,
  buttonText = "Null",
  inputButton = () => {},
  onMouseOver = () => {},
  onMouseOut = () => {},
  onClick = () => {},
  textarea = false,
  disabled = false,
  tooltipMessage = "",
  animatePlaceholder = true,
  containerClass = "",
  children,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [focusDebounced, setFocusDebounced] = useState(false);
  const input = useRef();
  const delayedFocus = _.debounce((focus) => setFocusDebounced(focus), 200);

  return (
    <div
      className={classNames(
        className,
        focusDebounced && !!tooltipMessage && "tooltip-shown"
      )}
    >
      <div
        className={classNames("input", disabled && "disabled", containerClass)}
        onClick={() => {
          input?.current.focus();
          onClick();
        }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && button) {
                inputButton();
              }
            }}
            placeholder=" "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            autoComplete="nope"
            {...props}
          ></input>
        )}
        {children}
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
          in={focus && tooltipMessage}
          timeout={200}
          unmountOnExit
          classNames="input-tooltip-anim"
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
