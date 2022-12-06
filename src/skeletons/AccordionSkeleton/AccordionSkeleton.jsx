import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import Shimmer from "../Shimmer";
import "./accordionskeleton.scss";
const AccordionSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-accordion">
        <Shimmer></Shimmer>

        <BaseSkeleton type="title "></BaseSkeleton>

        <BaseSkeleton type="title w100"></BaseSkeleton>

        <BaseSkeleton type="title w100"></BaseSkeleton>
      </div>
    </div>
  );
};

export default AccordionSkeleton;
