import React, { useState } from "react";
import { useEffect } from "react";
import "./bookingrequestsheader.scss";
import { getCurrentLanguage } from "../../services/language.serivce";
const BookingRequestsHeader = ({ booking, status, rawStatus }) => {
  const [date, setDate] = useState();
  useEffect(() => {
    const dates = [new Date(booking.dateStart), new Date(booking.dateEnd)];

    setDate(
      `${dates[0].toLocaleString(getCurrentLanguage(), {
        day: "numeric",
        month: "short",
      })} -  ${dates[1].toLocaleString(getCurrentLanguage(), {
        day: "numeric",
        month: "short",
      })}`
    );
  }, []);

  return (
    <div className="booking-header">
      <div className="booking-header-title">{booking.itemID.title}</div>
      <div className="booking-header-status">
        Status: <strong aria-label={rawStatus}>{status}</strong>
      </div>
      <div className="booking-header-dates">
        Dates: <strong>{date}</strong>
      </div>
    </div>
  );
};

export default BookingRequestsHeader;
