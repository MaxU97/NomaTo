import React from "react";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.component";
import "./bookingitemskeleton.scss";
const BookingItemSkeleton = () => {
  return (
    <div className="skeleton-booking-item">
      <div className="skeleton-booking-item-left">
        <div className="skeleton-booking-item-left-image">
          <BaseSkeleton type="image w250"></BaseSkeleton>
        </div>

        <div className="skeleton-booking-item-left-details">
          <BaseSkeleton type="title w100"></BaseSkeleton>
          <div className="skeleton-booking-item-left-details-minor">
            <BaseSkeleton type="text"></BaseSkeleton>
            <BaseSkeleton type="text"></BaseSkeleton>
            <BaseSkeleton type="text"></BaseSkeleton>
          </div>
        </div>
      </div>
      <div className="skeleton-booking-item-right">
        <BaseSkeleton type="button"></BaseSkeleton>
        <BaseSkeleton type="button"></BaseSkeleton>
        <BaseSkeleton type="button"></BaseSkeleton>
      </div>
    </div>
  );
};

export default BookingItemSkeleton;
