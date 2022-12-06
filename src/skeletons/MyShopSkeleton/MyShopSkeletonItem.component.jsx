import React from "react";
import useWindowDimensions from "../../services/responsive.service";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";

const MyShopSkeletonItem = () => {
  const { isMobile } = useWindowDimensions();
  return (
    <div className="skeleton-myshop-item">
      <BaseSkeleton type="image"></BaseSkeleton>
      <BaseSkeleton type="title"></BaseSkeleton>
      {isMobile && <BaseSkeleton type="title w100"></BaseSkeleton>}
    </div>
  );
};

export default MyShopSkeletonItem;
