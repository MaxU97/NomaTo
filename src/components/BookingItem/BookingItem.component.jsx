import React, { useEffect, useState } from "react";
import "./bookingitem.scss";
import { apiUrl } from "../../api/config";
import { getServiceCharge, getTotalPrice } from "../../services/price.service";
import { getCurrentLanguage } from "../../services/language.service";
import { Link } from "react-router-dom";
import { cancelBooking } from "../../api/booking";
import { useUserContext } from "../../context/user";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { useUtilityContext } from "../../context/utility";
import { t } from "i18next";
const BookingItem = ({ item, status }) => {
  const { state: utilityState } = useUtilityContext();

  const { GET_BOOKING_HISTORY } = useUserContext();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const [date, setDate] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [price, setPrice] = useState(0);
  useEffect(() => {
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
      (totalPrice + getServiceCharge(totalPrice, utilityState.serviceCharge)) *
      item.qtyWant;
    setPrice(totalPrice);
  }, []);

  const cancel = async (_id) => {
    const status = await cancelBooking(_id);
    await GET_BOOKING_HISTORY();
  };

  return (
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
        {["with_customer"].includes(item.status) && (
          <Link
            to={`qr-reader/${item._id}`}
            className="booking-item-buttons-button"
          >
            {t("my-bookings.confirm-dropoff")}
          </Link>
        )}
        {!["with_customer", "canceled", "declined", "returned"].includes(
          item.status
        ) && (
          <a
            className="booking-item-buttons-button cancel"
            onClick={async () => {
              setIsCanceling(true);
              await cancel(item._id);
            }}
          >
            {isCanceling ? "Canceling..." : "Cancel Booking"}
          </a>
        )}
      </div>
    </div>
  );
};

export default BookingItem;
