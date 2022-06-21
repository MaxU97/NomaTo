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
}) => {
  return (
    <div className={classNames("dropdown", className, containerClass)}>
      <Input
        placeholder={placeholder}
        containerClass={inputClass}
        value={value}
        setValue={setValue}
        className="dropdown-input"
        animatePlaceholder={false}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        disabled={disabled}
      >
        {hoverChild}
      </Input>
      {children && <div className="dropdown-content">{children}</div>}
    </div>
  );
};
export default Dropdown;
