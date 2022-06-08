import React, { useEffect, useState } from "react";
import { getBookingRequests } from "../../api/auth";
import { bookingStatuses } from "../../services/booking.categories";
import BookingRequestsItem from "../../components/BookingRequestsItem/BookingRequestsItem.component";
import classNames from "classnames";
import NotFound from "../NotFound";
import { useTranslation } from "react-i18next";
import Accordion from "../../components/Accordion/Accordion.component";
import "./bookingrequests.scss";
import BookingRequestsHeader from "../../components/BookingRequestsItem/BookingRequestsHeader.component";
const BookingRequests = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState();
  const [activeTab, setActiveTab] = useState(0);

  const bookingCategories = [
    t("booking-requests.all"),
    t("booking-requests.approval-required"),
    t("booking-requests.approved"),
    t("booking-requests.with-customer"),
    t("booking-requests.canceled"),
    t("booking-requests.declined"),
    t("booking-requests.returned"),
  ];

  useEffect(async () => {
    async function fetchBookings() {
      const bookingRequests = await getBookingRequests();

      setRequests(bookingRequests);
    }
    fetchBookings();
  }, []);
  return (
    <div className="booking-requests">
      <div className="container-l">
        {requests ? (
          <>
            <div className="booking-requests-content">
              <h1>{t("booking-requests.title")}</h1>
              <div className="booking-requests-content-container">
                <div className="booking-requests-content-left">
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
                <div className="booking-requests-content-scroll">
                  <div className="booking-requests-content-right">
                    <div className="booking-requests-content-right-container">
                      {requests.map((booking) => {
                        if (booking.status == bookingStatuses[activeTab]) {
                          return (
                            <Accordion
                              header_children={
                                <BookingRequestsHeader
                                  booking={booking}
                                  status={
                                    bookingCategories[
                                      bookingStatuses.indexOf(booking.status)
                                    ]
                                  }
                                  rawStatus={booking.status}
                                ></BookingRequestsHeader>
                              }
                            >
                              <BookingRequestsItem
                                item={booking}
                              ></BookingRequestsItem>
                            </Accordion>
                          );
                        } else if (bookingStatuses[activeTab] == "all") {
                          return (
                            <Accordion
                              header_children={
                                <BookingRequestsHeader
                                  booking={booking}
                                  status={
                                    bookingCategories[
                                      bookingStatuses.indexOf(booking.status)
                                    ]
                                  }
                                  rawStatus={booking.status}
                                ></BookingRequestsHeader>
                              }
                            >
                              <BookingRequestsItem
                                item={booking}
                                status={
                                  bookingCategories[
                                    bookingStatuses.indexOf(booking.status)
                                  ]
                                }
                              ></BookingRequestsItem>
                            </Accordion>
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

export default BookingRequests;
