import React from "react";
import "./picker-dropdownitem.scss";
const PickerDropwnItem = ({
  children,
  key = "",
  value = "",
  onSelect = () => {},
}) => {
  return value ? (
    <div className="picker-dropdown-item" onClick={() => onSelect(value)}>
      {value}
    </div>
  ) : (
    <></>
  );
};

export default PickerDropwnItem;
