import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./itempageskeleton.scss";
const ItemPageOwnerSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-item-page-owner">
        <Shimmer></Shimmer>
        <BaseSkeleton type="avatar"></BaseSkeleton>
        <BaseSkeleton type="title"></BaseSkeleton>
      </div>
    </div>
  );
};

export default ItemPageOwnerSkeleton;
