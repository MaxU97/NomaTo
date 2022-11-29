import classNames from "classnames";
import React, { useState } from "react";
import Input from "../Input/Input.component";
import "./dropdown.scss";
const Dropdown = ({
  placeholder = "",
  children,
  className = "",
  value = "",
  setValue = () => {},
  inputClass,
  containerClass,
  hoverChild,
  onMouseOver = () => {},
  onMouseOut = () => {},
  disabled,
  error,
  errorText,
  showInformation,
  informationText,
  withoutError,
  placeholderColor,
}) => {
  const blockPropagation = (e) => {
    if (e) {
      e.stopPropagation();
    }
  };
  return (
    <div className={classNames("dropdown", className, containerClass)}>
      <div className="dropdown-input">
        <Input
          placeholder={placeholder}
          placeholderColor={placeholderColor}
          containerClass={inputClass}
          value={value}
          setValue={setValue}
          animatePlaceholder={false}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          disabled={disabled}
          withoutError={withoutError}
          error={error}
          errorText={errorText}
          showInformation={showInformation}
          informationText={informationText}
        >
          {hoverChild}
        </Input>
      </div>
      {children && (
        <div className="dropdown-content" onTouchMove={blockPropagation}>
          {children}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
