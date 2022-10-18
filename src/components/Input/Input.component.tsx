import classNames from "classnames";
import React, { useRef } from "react";
import useWindowDimensions from "../../services/responsive.service";
import "./Input.styles.scss";
interface InputInterface {
  value: string;
  setValue: (val: string | number) => void;
  className?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  onMouseOver?: (event: any) => void;
  onMouseOut?: (event: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  style: any;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  buttonText?: string;
  buttonAction: () => void;
  animatePlaceholder: boolean;
  withoutError: boolean;
  showInformation: boolean;
  informationText: string;
  inputRef?: any;
  placeholderColor: string;
  charLimit?: number;
  clickable: boolean;
}
const Input = ({
  value,
  setValue,
  placeholder = "",
  className = "",
  type = "text",
  onMouseOver = () => {},
  onMouseOut = () => {},
  onClick = () => {},
  onFocus = () => {},
  disabled = false,
  error = false,
  errorText = "",
  buttonText = "",
  buttonAction = () => {},
  animatePlaceholder = true,
  withoutError = false,
  showInformation = false,
  informationText = "",
  onKeyDown = () => {},
  inputRef,
  placeholderColor,
  charLimit,
  clickable = false,
}: InputInterface) => {
  const validNumberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const checkValidValue = (e) => {
    const reg = new RegExp("^[0-9]+$");
    if (
      (reg.test(e.target.value) || e.target.value === "") &&
      type === "number"
    ) {
      setValue(Number(e.target.value));
    } else if (type !== "number") {
      setValue(e.target.value);
    }
  };

  // const input = useRef();
  const { isMobile } = useWindowDimensions();
  return (
    <div className="custom-input-wrapper">
      <div
        className={classNames("custom-input-container", {
          "custom-input-container-error": error,
          clickable: clickable,
        })}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        <input
          className={classNames("custom-input", {
            clickable: clickable,
          })}
          type={type == "number" ? "text" : type}
          ref={(el) => {
            if (inputRef) inputRef.current = el;
          }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => checkValidValue(e)}
          disabled={disabled || clickable}
          onFocus={(e) => onFocus(e)}
          onKeyDown={(e) => onKeyDown(e)}
          maxLength={charLimit ? charLimit : 524288}
        />
        {placeholder && (
          <div
            className={classNames("custom-input-placeholder", {
              "custom-input-placeholder-static":
                !animatePlaceholder || isMobile,
            })}
            style={{ color: placeholderColor }}
          >
            {placeholder}
          </div>
        )}
        {!!buttonText && (
          <a className="custom-input-button" onClick={buttonAction}>
            <div>{buttonText}</div>
          </a>
        )}
      </div>
      {!withoutError &&
        (showInformation ? (
          <div className="custom-input-information">{informationText}</div>
        ) : (
          <div className="custom-input-error">{error && errorText}</div>
        ))}
    </div>
  );
};

export default Input;
