import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./itempageskeleton.scss";
const ItemPageReviewSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-item-page-review">
        <Shimmer></Shimmer>
        <div className="skeleton-item-page-review-top">
          <BaseSkeleton type="avatar s"></BaseSkeleton>
          <BaseSkeleton type="text"></BaseSkeleton>
        </div>
        <div className="skeleton-item-page-review-middle">
          <BaseSkeleton type="text"></BaseSkeleton>
          <BaseSkeleton type="text"></BaseSkeleton>
        </div>
        <BaseSkeleton type="title w75"></BaseSkeleton>
      </div>
    </div>
  );
};

export default ItemPageReviewSkeleton;
