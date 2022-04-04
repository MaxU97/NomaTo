import React from "react";
import { useState, useRef } from "react";
import classNames from "classnames";
import "./input.scss";
const Input = ({
  value = "",
  placeholder = "",
  setValue = () => {},
  className = "",
  button = false,
  buttonText = "Null",
  inputButton = () => {},
  textarea = false,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const input = useRef();

  return (
    <div
      className={classNames("input", className)}
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
          onBlur={() => setFocus(false)}
          placeholder=" "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...props}
        ></input>
      )}
      {placeholder && <div className="input-placeholder">{placeholder}</div>}
      {button && (
        <a className="input-button" onClick={() => inputButton()}>
          <div>{buttonText}</div>
        </a>
      )}
    </div>
  );
};

export default Input;
