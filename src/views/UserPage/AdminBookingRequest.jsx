import React from "react";
import { apiUrl, websitUrl } from "../../api/config";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookingStatusesMapping } from "../../services/nomato.constants";

const AdminBookingRequest = ({ request }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const bookingStatuses = BookingStatusesMapping(t);
  return (
    <tr>
      {/* Item Column */}
      <td>
        <Link
          className="user-requests-field"
          to={{
            pathname: `/item/${request.itemID._id}`,
            state: { from: location.pathname },
          }}
        >
          {request.itemID.title}
          <img
            className="user-requests-item-img"
            src={apiUrl + "/" + request.itemID.images[0]}
          ></img>
        </Link>
      </td>

      {/* User Column */}
      <td>
        <a className="user-requests-field" href={`/user/${request.userID._id}`}>
          {request.userID.name + " " + request.userID.surname}
          <img
            className="user-requests-profile-img"
            src={apiUrl + "/" + request.userID.profileImage}
          ></img>
        </a>
      </td>

      {/* Dates Column */}
      <td style={{ verticalAlign: "center" }}>
        {new Date(request.dateStart).toDateString() +
          " - " +
          new Date(request.dateEnd).toDateString()}
      </td>

      {/* Status Column */}
      <td>
        {bookingStatuses[request.status]}{" "}
        <p>
          {request.status === "refused" &&
            request.refuseReason &&
            `(${request.refuseReason})`}
        </p>
      </td>

      {/* Extras column */}
      <td>
        {request.extras &&
          request.extras.length &&
          request.extras.map((extra, index) => {
            return (
              <p>{`${extra.title} (${euroLocale.format(extra.price)})`}</p>
            );
          })}
      </td>

      {/* Message column */}
      <td>{request.comment ? request.comment : ""}</td>

      {/* StripeID column */}
      <td>{request.intentID ? request.intentID : ""}</td>
    </tr>
  );
};

export default AdminBookingRequest;
