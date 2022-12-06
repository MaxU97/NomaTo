import React from "react";
import "./BaseSkeleton/baseskeleton.scss";
import Shimmer from "./Shimmer";
const SkeletonWrapper = ({ children }) => {
  return (
    <div className="skeleton-wrapper">
      <Shimmer></Shimmer>
      {children}
    </div>
  );
};
export default SkeletonWrapper;
