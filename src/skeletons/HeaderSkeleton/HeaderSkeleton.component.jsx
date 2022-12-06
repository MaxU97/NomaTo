import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./headerskeleton.scss";
const HeaderSkeleton = () => {
  return (
    <div style={{ width: "fit-content" }} className="skeleton-wrapper">
      <div className="skeleton-header">
        <Shimmer></Shimmer>
        <BaseSkeleton type="title w100"></BaseSkeleton>
        <BaseSkeleton type="title w100"></BaseSkeleton>
        <BaseSkeleton type="title w100"></BaseSkeleton>
        <BaseSkeleton type="title w100"></BaseSkeleton>
        <BaseSkeleton type="title w100"></BaseSkeleton>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
