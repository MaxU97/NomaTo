import classNames from "classnames";
import React from "react";
import "./progressbar.scss";
const ProgressBar = ({ progress = 0 }) => {
  const getProggressClass = () => {
    if (progress < 20) {
      return "p0";
    } else if (progress < 40) {
      return "p20";
    } else if (progress < 60) {
      return "p40";
    } else if (progress < 80) {
      return "p60";
    } else if (progress < 100) {
      return "p80";
    } else if (progress >= 100) {
      return "p100";
    }
  };
  return (
    <div className="wrapper">
      <div className="progress-bar-background">
        <div
          className={classNames("progress-bar-foreground", getProggressClass())}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
