import React, { useEffect, useState } from "react";
import "./bookingitem.scss";
import { apiUrl } from "../../api/config";
import { getServiceCharge, getTotalPrice } from "../../services/price.service";
import { getCurrentLanguage } from "../../services/language.service";
import { Link, useLocation } from "react-router-dom";
import { cancelBooking } from "../../api/booking";
import { useUserContext } from "../../context/user";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { useUtilityContext } from "../../context/utility";
import { t } from "i18next";
import { set } from "date-fns";
import BookingItemSkeleton from "../../skeletons/BookingItemSkeleton/BookingItemSkeleton.component";
import SkeletonWrapper from "../../skeletons/SkeletonWrapper";
import Shimmer from "../../skeletons/Shimmer";
const BookingItem = ({ item, status }) => {
  const dateNow = set(new Date(Date.now()), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const { state: utilityState } = useUtilityContext();

  const { GET_BOOKING_HISTORY } = useUserContext();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const [date, setDate] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [price, setPrice] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (item) {
      const dates = [new Date(item.dateStart), new Date(item.dateEnd)];

      setDate(
        `${dates[0].toLocaleString(getCurrentLanguage(), {
          day: "numeric",
          month: "short",
        })} -  ${dates[1].toLocaleString(getCurrentLanguage(), {
          day: "numeric",
          month: "short",
        })}`
      );

      var totalPrice = getTotalPrice(
        item.itemID.rentPriceDay,
        item.itemID.rentPriceWeek,
        item.itemID.rentPriceMonth,
        item.dateStart,
        item.dateEnd
      );

      totalPrice =
        (totalPrice +
          getServiceCharge(totalPrice, utilityState.serviceCharge)) *
        item.qtyWant;
      setPrice(totalPrice);
    }
  }, []);

  const cancel = async (_id) => {
    const status = await cancelBooking(_id);
    await GET_BOOKING_HISTORY();
  };

  return item ? (
    <div className="booking-item">
      <div className="booking-item-left">
        <div className="booking-item-image">
          <img src={`${apiUrl}/${item.itemID.images[0]}`} />
        </div>

        <div className="booking-item-details">
          <div className="booking-item-details-title">
            {item.itemID.title} {status && `(${status})`}
          </div>
          <div className="booking-item-details-dates">
            <strong>Dates: </strong>
            {date}
          </div>
          <div className="booking-item-details-price">
            <strong>Price: </strong>
            {euroLocale.format(price)}
          </div>
          <div className="booking-item-details-price">
            <strong>Quantity: </strong>
            {item.qtyWant}
          </div>
          {item.comment && (
            <div className="booking-item-details-comment">
              <strong>Message:</strong>

              <div className="booking-item-details-comment-container">
                {item.comment}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="booking-item-buttons">
        <Link
          to={`/item/${item.itemID._id}`}
          className="booking-item-buttons-button"
        >
          View Item Page
        </Link>
        {["approved"].includes(item.status) && (
          <Link
            to={`qr-code/pickup/${item._id}`}
            className="booking-item-buttons-button"
          >
            {t("my-bookings.view-qr")}
          </Link>
        )}
        {["with_customer"].includes(item.status) && item.dateEnd === dateNow && (
          <Link
            to={{
              pathname: `qr-reader/${item._id}`,
              state: { from: location.pathname },
            }}
            className="booking-item-buttons-button"
          >
            {t("my-bookings.confirm-dropoff")}
          </Link>
        )}
        {![
          "with_customer",
          "canceled",
          "declined",
          "returned",
          "refused",
        ].includes(item.status) && (
          <a
            className="booking-item-buttons-button cancel"
            onClick={async () => {
              setIsCanceling(true);
              await cancel(item._id);
            }}
          >
            {isCanceling
              ? t("my-bookings.canceling")
              : t("my-bookings.cancel-booking")}
          </a>
        )}
        {(item.reviewed != undefined || item.reviewed != null) &&
          !item.reviewed && (
            <Link
              to={{
                pathname: `/review/${item._id}`,
                state: { from: location.pathname },
              }}
              className="booking-item-buttons-button"
            >
              {t("my-bookings.leave-a-review")}
            </Link>
          )}
      </div>
    </div>
  ) : (
    <SkeletonWrapper>
      <div className="booking-item">
        <BookingItemSkeleton></BookingItemSkeleton>
      </div>
    </SkeletonWrapper>
  );
};

export default BookingItem;
