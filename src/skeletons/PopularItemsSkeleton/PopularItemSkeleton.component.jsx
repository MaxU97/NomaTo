import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./popularitemsskeleton.scss";
const PopularItemSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <Shimmer></Shimmer>
      <div className="skeleton-popular-item">
        <BaseSkeleton type="image"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="title"></BaseSkeleton>
        <BaseSkeleton type="text short"></BaseSkeleton>
      </div>
    </div>
  );
};

export default PopularItemSkeleton;
