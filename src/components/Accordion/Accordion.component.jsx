import React, { useState } from "react";
import { DownIcon } from "../../assets/Icons";
import "./accordion.scss";
const Accordion = ({ children, header_children }) => {
  const [isOpen, setIsOpen] = useState(false);
  debugger;
  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="accordion-header-content">
          {header_children}
          <DownIcon className="toggle" aria-expanded={isOpen}></DownIcon>
        </div>
      </div>
      <div className="accordion-container" aria-expanded={!isOpen}>
        <div className="accordion-container-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
