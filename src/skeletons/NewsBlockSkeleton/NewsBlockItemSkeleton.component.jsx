import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";

const NewsBlockItemSkeleton = () => {
  return (
    <div className="skeleton-news-block-item">
      <BaseSkeleton type="image"></BaseSkeleton>
      <BaseSkeleton type="title"></BaseSkeleton>
      <div className="skeleton-news-block-item-text">
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
        <BaseSkeleton type="text"></BaseSkeleton>
      </div>
      <BaseSkeleton type="text short"></BaseSkeleton>
    </div>
  );
};

export default NewsBlockItemSkeleton;
