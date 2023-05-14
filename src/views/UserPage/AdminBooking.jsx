import React, { useEffect } from "react";
import { apiUrl, websitUrl } from "../../api/config";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookingStatusesMapping } from "../../services/nomato.constants";

const AdminBooking = ({ booking }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const bookingStatuses = BookingStatusesMapping(t);
  useEffect(() => {
    debugger;
    console.log(booking);
  }, []);

  return (
    booking && (
      <tr>
        {/* Item Column */}
        <td>
          <Link
            className="user-requests-field"
            to={{
              pathname: `/item/${booking.itemID._id}`,
              state: { from: location.pathname },
            }}
          >
            {booking.itemID.title}
            <img
              className="user-requests-item-img"
              src={apiUrl + "/" + booking.itemID.images[0]}
            ></img>
          </Link>
        </td>

        {/* Owner Column */}
        <td>
          <a
            className="user-requests-field"
            href={`/user/${booking.ownerID._id}`}
          >
            {booking.ownerID.name + " " + booking.ownerID.surname}
            <img
              className="user-requests-profile-img"
              src={apiUrl + "/" + booking.ownerID.profileImage}
            ></img>
          </a>
        </td>

        {/* Dates Column */}
        <td style={{ verticalAlign: "center" }}>
          {new Date(booking.dateStart).toDateString() +
            " - " +
            new Date(booking.dateEnd).toDateString()}
        </td>

        {/* Status Column */}
        <td>
          {bookingStatuses[booking.status]}{" "}
          <p>
            {booking.status === "refused" &&
              booking.refuseReason &&
              `(${booking.refuseReason})`}
          </p>
        </td>

        {/* Extras column */}
        <td>
          {booking.extras &&
            booking.extras.length &&
            booking.extras.map((extra, index) => {
              return (
                <p>{`${extra.title} (${euroLocale.format(extra.price)})`}</p>
              );
            })}
        </td>

        {/* Message column */}
        <td>{booking.comment ? booking.comment : ""}</td>

        {/* StripeID column */}
        <td>{booking.intentID ? booking.intentID : ""}</td>
      </tr>
    )
  );
};

export default AdminBooking;
