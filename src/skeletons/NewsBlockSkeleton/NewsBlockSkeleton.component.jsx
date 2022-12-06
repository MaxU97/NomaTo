import React from "react";
import Shimmer from "../Shimmer";
import NewsBlockItemSkeleton from "./NewsBlockItemSkeleton.component";
import "./newsblockskeleton.scss";
const NewsBlockSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-news-block">
        <Shimmer></Shimmer>
        <NewsBlockItemSkeleton></NewsBlockItemSkeleton>
        <NewsBlockItemSkeleton></NewsBlockItemSkeleton>
        <NewsBlockItemSkeleton></NewsBlockItemSkeleton>
      </div>
    </div>
  );
};

export default NewsBlockSkeleton;
