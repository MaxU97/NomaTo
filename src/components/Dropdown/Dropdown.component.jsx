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
}) => {
  return (
    <div className={classNames("dropdown", className)}>
      <Input
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        className="dropdown-input"
        animatePlaceholder={false}
      ></Input>
      {children && <div className="dropdown-content">{children}</div>}
    </div>
  );
};
export default Dropdown;
