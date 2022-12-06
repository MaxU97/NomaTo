import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./itempageskeleton.scss";
const ItemPageDescriptionSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-item-page-description">
        <Shimmer></Shimmer>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
      </div>
    </div>
  );
};

export default ItemPageDescriptionSkeleton;
