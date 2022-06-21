import classNames from "classnames";
import React, { useState } from "react";
import { CloseIcon } from "../../assets/Icons";
import Input from "../Input/Input.component";
import "./picker-dropdown.scss";

const PickerDropdown = ({
  placeholder = "",
  children,
  className = "",
  containerClassname = "",
  onDelete = () => {},
  selectedValues,
  hoverError,
}) => {
  const [dropdown, toggleDropdown] = useState(false);

  return (
    <div className={classNames("picker-dropdown", className)}>
      <div
        className={classNames("picker-dropdown-input", containerClassname)}
        onClick={() => {
          toggleDropdown(!dropdown);
        }}
      >
        {hoverError}
      </div>
      <div
        className="picker-dropdown-container"
        onClick={() => {
          toggleDropdown(!dropdown);
        }}
      >
        {selectedValues.length <= 0 && (
          <div className="picker-dropdown-container-placeholder">
            {placeholder}
          </div>
        )}
        {selectedValues.map((value) => {
          return (
            <div className="picker-dropdown-container-selected">
              {value}
              <CloseIcon
                onClick={(event) => {
                  onDelete(event, value);
                }}
              />
            </div>
          );
        })}
      </div>
      {dropdown && children.length > 0 && (
        <div
          className="picker-dropdown-content"
          onClick={() => {
            toggleDropdown(!dropdown);
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
export default PickerDropdown;
