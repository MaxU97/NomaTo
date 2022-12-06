import React from "react";
import "./baseskeleton.scss";
const BaseSkeleton = ({ type }) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};

export default BaseSkeleton;
