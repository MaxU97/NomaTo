import React from "react";
import { MoveIcon } from "../../assets/Icons";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./carouselskeleton.scss";
import CarouselSkeletonItem from "./CarouselSkeletonItem.component";
const CarouselSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-carousel">
        <Shimmer></Shimmer>
        <CarouselSkeletonItem></CarouselSkeletonItem>
        <CarouselSkeletonItem></CarouselSkeletonItem>
        <CarouselSkeletonItem></CarouselSkeletonItem>
        <CarouselSkeletonItem></CarouselSkeletonItem>
        <CarouselSkeletonItem></CarouselSkeletonItem>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
