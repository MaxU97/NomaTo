import React from "react";
import Shimmer from "../Shimmer";
import "./myshopskeleton.scss";
import MyShopSkeletonItem from "./MyShopSkeletonItem.component";
const MyShopSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-myshop">
        <Shimmer></Shimmer>
        <MyShopSkeletonItem></MyShopSkeletonItem>
      </div>
    </div>
  );
};

export default MyShopSkeleton;
