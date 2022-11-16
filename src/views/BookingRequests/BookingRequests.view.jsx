import React, { useEffect, useState } from "react";
import { getBookingRequests } from "../../api/auth";
import { bookingStatuses } from "../../services/booking.categories";
import BookingRequestsItem from "../../components/BookingRequestsItem/BookingRequestsItem.component";
import classNames from "classnames";
import NotFound from "../NotFound/NotFound";
import { useTranslation } from "react-i18next";
import Accordion from "../../components/Accordion/Accordion.component";
import "./bookingrequests.scss";
import BookingRequestsHeader from "../../components/BookingRequestsItem/BookingRequestsHeader.component";
import useWindowDimensions from "../../services/responsive.service";
import { SpinnerAnimationIcon } from "../../assets/Icons";
const BookingRequests = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [dropdown, toggleDropdown] = useState(false);
  const { isMobile } = useWindowDimensions();

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
        <>
          <div className="booking-requests-content">
            <h1>{t("booking-requests.title")}</h1>
            <div className="booking-requests-content-container">
              <div className="booking-requests-content-left">
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
              <div className="booking-requests-content-right">
                {requests ? (
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

export default BookingRequests;
