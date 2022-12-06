import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";

const CarouselSkeletonItem = () => {
  return (
    <div className="skeleton-carousel-item">
      <BaseSkeleton type="image"></BaseSkeleton>
      <BaseSkeleton type="text"></BaseSkeleton>
      <BaseSkeleton type="title"></BaseSkeleton>
      <BaseSkeleton type="text short"></BaseSkeleton>
    </div>
  );
};

export default CarouselSkeletonItem;
