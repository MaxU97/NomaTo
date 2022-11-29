import classNames from "classnames";
import React, { useEffect, useState } from "react";
import BookingItem from "../../components/BookingItem/BookingItem.component";
import { useUserContext } from "../../context/user";
import NotFound from "../NotFound/NotFound";
import "./mybookings.scss";
import { bookingStatuses } from "../../services/nomato.constants";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../services/responsive.service";
import { SpinnerAnimationIcon } from "../../assets/Icons";
const MyBookings = () => {
  const { t } = useTranslation();

  const bookingCategories = [
    t("my-bookings.all"),
    t("my-bookings.approval-required"),
    t("my-bookings.approved"),
    t("my-bookings.with-customer"),
    t("my-bookings.canceled"),
    t("my-bookings.declined"),
    t("my-bookings.returned"),
  ];
  const { state, GET_BOOKING_HISTORY } = useUserContext();
  const [activeTab, setActiveTab] = useState(0);
  const [dropdown, toggleDropdown] = useState(false);
  const { isMobile } = useWindowDimensions();
  useEffect(() => {
    GET_BOOKING_HISTORY();
  }, []);

  return (
    <div className="bookings">
      <div className="container-l">
        <>
          <div className="bookings-content">
            <h1>{t("my-bookings.title")}</h1>
            <div className="bookings-content-container">
              <div className="bookings-content-left">
                {isMobile ? (
                  <div
                    className={classNames("booking-cats", dropdown && "active")}
                  >
                    <div
                      className="booking-cats-current"
                      onClick={() => {
                        toggleDropdown(!dropdown);
                      }}
                    >
                      <div className="booking-cats-current-text">
                        {bookingCategories[activeTab]}
                      </div>
                    </div>
                    {dropdown && (
                      <div className="booking-cats-list">
                        {bookingCategories.map((cat, index) => {
                          if (cat !== bookingCategories[activeTab])
                            return (
                              <div
                                key={index}
                                className="booking-cats-list-item"
                                onClick={() => {
                                  setActiveTab(index);
                                  toggleDropdown(!dropdown);
                                }}
                              >
                                {cat}
                              </div>
                            );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="menu-list">
                    {bookingCategories.map((cat, index) => (
                      <div
                        className={classNames(
                          "menu-list-item",
                          activeTab == index && "active"
                        )}
                        onClick={() => {
                          !(activeTab == index) && setActiveTab(index);
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bookings-content-right">
                {state.bookingHistoryLoaded ? (
                  <div className="bookings-content-right-container">
                    {state.bookingHistory.map((booking) => {
                      if (booking.status == bookingStatuses[activeTab]) {
                        return <BookingItem item={booking}></BookingItem>;
                      } else if (bookingStatuses[activeTab] == "all") {
                        return (
                          <BookingItem
                            item={booking}
                            status={
                              bookingCategories[
                                bookingStatuses.indexOf(booking.status)
                              ]
                            }
                          ></BookingItem>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default MyBookings;
