import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./itempageskeleton.scss";
export const ItemPageMapSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-item-page-map">
        <Shimmer></Shimmer>
        <BaseSkeleton type="map"></BaseSkeleton>
      </div>
    </div>
  );
};
