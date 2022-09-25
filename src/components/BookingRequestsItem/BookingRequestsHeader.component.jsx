import React, { useState } from "react";
import { useEffect } from "react";
import "./bookingrequestsheader.scss";
import { getCurrentLanguage } from "../../services/language.service";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../services/responsive.service";
const BookingRequestsHeader = ({ booking, status, rawStatus }) => {
  const { isMobile } = useWindowDimensions();
  const [date, setDate] = useState();
  const { t } = useTranslation();
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
      {isMobile ? (
        <>
          <div className="booking-header-dates">
            {t("booking-requests.dates")}: <strong>{date}</strong>
          </div>
          <div className="booking-header-status">
            {t("booking-requests.status")}:{" "}
            <strong aria-label={rawStatus}>{status}</strong>
          </div>
        </>
      ) : (
        <>
          <div className="booking-header-status">
            {t("booking-requests.status")}:{" "}
            <strong aria-label={rawStatus}>{status}</strong>
          </div>
          <div className="booking-header-dates">
            {t("booking-requests.dates")}: <strong>{date}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingRequestsHeader;
