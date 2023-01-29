import React, { useEffect, useState } from "react";
import "./bookingitem.scss";
import { apiUrl } from "../../api/config";
import {
  getExtrasPrice,
  getServiceCharge,
  getTotalPrice,
} from "../../services/price.service";
import { getCurrentLanguage } from "../../services/language.service";
import { Link, useLocation } from "react-router-dom";
import { cancelBooking } from "../../api/booking";
import { useUserContext } from "../../context/user";
import { DownIcon, SpinnerAnimationIcon } from "../../assets/Icons";
import { useUtilityContext } from "../../context/utility";
import { t } from "i18next";
import { set } from "date-fns";
import BookingItemSkeleton from "../../skeletons/BookingItemSkeleton/BookingItemSkeleton.component";
import SkeletonWrapper from "../../skeletons/SkeletonWrapper";
import Shimmer from "../../skeletons/Shimmer";
import { useTranslation } from "react-i18next";
import { usePromptHandler } from "../Prompt/Prompt.component";
const BookingItem = ({ item, status }) => {
  const dateNow = set(new Date(Date.now()), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const { prompt } = usePromptHandler();
  const { t } = useTranslation();
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
      var extrasCharge = 0;
      if (item.extras && item.extras.length) {
        extrasCharge = getExtrasPrice(item.extras);
      }

      totalPrice =
        (totalPrice +
          getServiceCharge(
            totalPrice,
            utilityState.serviceCharge,
            extrasCharge
          )) *
          item.qtyWant +
        extrasCharge;
      setPrice(totalPrice);
    }
  }, [item]);

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
            <strong>{t("my-bookings.dates")} </strong>
            {date}
          </div>
          <div className="booking-item-details-price">
            <strong>{t("my-bookings.price")} </strong>
            {euroLocale.format(price)}
          </div>
          <div className="booking-item-details-price">
            <strong>{t("my-bookings.qty")}</strong>
            {item.qtyWant}
          </div>
          {item.extras && item.extras.length && (
            <div className="booking-item-details-extras">
              <strong>{t("my-bookings.extras")}</strong>
              <div className="booking-item-details-extras-content">
                <DownIcon className="booking-item-details-extras-button"></DownIcon>
                <div className="booking-item-details-extras-list">
                  {item.extras.map((value, index) => {
                    return (
                      <span>{`${value.title} (+${euroLocale.format(
                        value.price
                      )})`}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {item.comment && (
            <div className="booking-item-details-comment">
              <strong>{t("my-bookings.message")}</strong>

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
          {t("my-bookings.item-page")}
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
              prompt(
                t("my-bookings.cancel-prompt", {
                  item_title: item.itemID.title,
                }),
                t("my-bookings.cancel-information"),
                async () => {
                  setIsCanceling(true);
                  await cancel(item._id);
                }
              );
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
