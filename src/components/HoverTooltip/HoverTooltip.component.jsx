import React from "react";
import "./hovertooltip.scss";
import { CSSTransition } from "react-transition-group";
const HoverTooltip = ({ content = "in", inVar = "", style }) => {
  return (
    <CSSTransition
      in={inVar}
      timeout={500}
      unmountOnExit
      classNames="hover-container"
    >
      <div className="hover-error" style={{ ...style }}>
        <div className="hover-error-content m">
          {content}
          <div class="arrow-right"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HoverTooltip;
