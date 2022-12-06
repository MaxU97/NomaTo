import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./itempageskeleton.scss";
const ItemPageGallerySkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-item-page-gallery">
        <Shimmer></Shimmer>
        <BaseSkeleton type="image"></BaseSkeleton>
        <div className="skeleton-item-page-gallery-minor">
          <BaseSkeleton type="image"></BaseSkeleton>
          <BaseSkeleton type="image"></BaseSkeleton>
          <BaseSkeleton type="image"></BaseSkeleton>
          <BaseSkeleton type="image"></BaseSkeleton>
          <BaseSkeleton type="image"></BaseSkeleton>
        </div>
      </div>
    </div>
  );
};

export default ItemPageGallerySkeleton;
