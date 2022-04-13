import React from "react";
import "./dropdownitem.scss";
const DropdownItem = ({
  children,
  key = "",
  value = "",
  onSelect = () => {},
}) => {
  return value ? (
    <div className="dropdown-item" onClick={() => onSelect(value)}>
      {value}
    </div>
  ) : (
    <></>
  );
};

export default DropdownItem;
