import React from "react";
import "./hovertooltip.scss";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
const HoverTooltip = ({
  content = "in",
  inVar = "",
  style,
  type = "right",
}) => {
  return (
    <CSSTransition
      in={inVar}
      timeout={500}
      unmountOnExit
      classNames="hover-container"
    >
      <div className="hover-error" style={{ ...style }}>
        <div className={classNames("hover-error-content m", type)}>
          {content}
          <div class={`arrow-${type}`}></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HoverTooltip;
