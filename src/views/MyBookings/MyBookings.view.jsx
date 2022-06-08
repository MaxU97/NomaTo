import classNames from "classnames";
import React, { useEffect, useState } from "react";
import BookingItem from "../../components/BookingItem/BookingItem.component";
import { useUserContext } from "../../context/user";
import NotFound from "../NotFound";
import "./mybookings.scss";
import { bookingStatuses } from "../../services/booking.categories";
import { useTranslation } from "react-i18next";
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
  useEffect(() => {
    GET_BOOKING_HISTORY();
  }, []);

  return (
    <div className="bookings">
      <div className="container-l">
        {state.bookingHistoryLoaded ? (
          <>
            <div className="bookings-content">
              <h1>My Bookings</h1>
              <div className="bookings-content-container">
                <div className="bookings-content-left">
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
                </div>
                <div className="bookings-content-scroll">
                  <div className="bookings-content-right">
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
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NotFound></NotFound>
        )}
      </div>
    </div>
  );
};
export default MyBookings;
