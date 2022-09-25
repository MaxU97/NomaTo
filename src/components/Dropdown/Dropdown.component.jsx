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
  return (
    <div className={classNames("dropdown", className, containerClass)}>
      <Input
        placeholder={placeholder}
        placeholderColor={placeholderColor}
        containerClass={inputClass}
        value={value}
        setValue={setValue}
        className="dropdown-input"
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
      {children && <div className="dropdown-content">{children}</div>}
    </div>
  );
};
export default Dropdown;
