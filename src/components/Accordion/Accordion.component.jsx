import React, { useState } from "react";
import { DownIcon } from "../../assets/Icons";
import AccordionSkeleton from "../../skeletons/AccordionSkeleton/AccordionSkeleton";
import "./accordion.scss";
const Accordion = ({ children, header_children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return header_children ? (
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
  ) : (
    <div className="accordion">
      <div className="accordion-header">
        <div className="accordion-header-content">
          <AccordionSkeleton></AccordionSkeleton>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
