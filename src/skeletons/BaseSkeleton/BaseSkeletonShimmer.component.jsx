import React from "react";
import Shimmer from "../Shimmer";
import BaseSkeleton from "./BaseSkeleton.component";

export const BaseSkeletonShimmer = ({ type }) => {
  return (
    <div className="skeleton-wrapper">
      <Shimmer></Shimmer>
      <BaseSkeleton type={type}></BaseSkeleton>
    </div>
  );
};
