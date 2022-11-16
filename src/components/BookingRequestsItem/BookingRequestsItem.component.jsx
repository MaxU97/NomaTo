import React, { useEffect, useState } from "react";
import "./bookingrequestsitem.scss";
import { apiUrl } from "../../api/config";
import { getTotalPrice } from "../../services/price.service";
import { getCurrentLanguage } from "../../services/language.service";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal.component";
import classNames from "classnames";
import TextArea from "../TextArea/TextArea.component";
import { getApprovedUser, refuseBooking } from "../../api/booking";
import { approveBooking } from "../../api/booking";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
import { set } from "date-fns/esm";
const BookingRequestsItem = ({ item, status }) => {
  const { t } = useTranslation();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const [isDeclining, setIsDeclining] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [refusalReason, setRefusalReason] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [approvedUser, setApprovedUser] = useState();
  const location = useLocation();
  const [price, setPrice] = useState(0);

  const dateNow = set(new Date(Date.now()), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const { notification } = useNotificationHandler();
  const approve = async (_id) => {
    try {
      await approveBooking(_id);
    } catch (err) {
      notification([err]);
    }

    window.location.reload();
  };
  const refuse = async () => {
    await refuseBooking(bookingID, refusalReason);
    window.location.reload();
  };

  useEffect(() => {
    //reset booking for refusal and reason
    if (!declineModal) {
      setBookingID("");
      setRefusalReason("");
    }
  }, [declineModal]);

  useEffect(() => {
    if (item.status == "approved") {
      const prom = getApprovedUser(item.userID._id, item._id);
      Promise.all([prom]).then((user) => {
        setApprovedUser(user[0]);
      });
    }

    var totalPrice = getTotalPrice(
      item.itemID.rentPriceDay,
      item.itemID.rentPriceWeek,
      item.itemID.rentPriceMonth,
      item.dateStart,
      item.dateEnd
    );

    setPrice(totalPrice * item.qtyWant);
  }, []);

  return (
    <>
      <div className="booking-request-item">
        <div className="booking-request-item-container">
          <div className="booking-request-item-image">
            <img src={`${apiUrl}/${item.itemID.images[0]}`} />
          </div>

          <div className="booking-request-item-details">
            <div className="booking-request-item-details-field">
              <strong>{t("booking-requests.user")}: </strong>
              <img
                className="profile-image"
                src={`${apiUrl + "/" + item.userID.profileImage}`}
              ></img>
              {item.userID.name} {item.userID.surname}
            </div>
            <div className="booking-request-item-details-field">
              <strong>{t("booking-requests.prefered-languages")}</strong>
              {item.userID.preferedLanguage}
            </div>
            <div className="booking-request-item-details-field price">
              <strong>{t("booking-requests.price")}: </strong>
              {euroLocale.format(price)}
            </div>
            <div className="booking-request-item-details-field">
              <strong>{t("booking-requests.qty-request")}:</strong>
              {item.qtyWant}
            </div>
          </div>

          <div className="booking-request-item-message">
            <strong>{t("booking-requests.message")}:</strong>
            <div className="booking-request-item-message-scroll">
              <div className="booking-request-item-message-scroll-content">
                {item.comment ? item.comment : "No Message"}
              </div>
            </div>
          </div>
        </div>
        <div className={classNames("booking-request-item-actions")}>
          {![
            "with_customer",
            "canceled",
            "refused",
            "returned",
            "approved",
          ].includes(item.status) && (
            <>
              <button
                className="booking-request-item-actions-button decline"
                onClick={() => {
                  setDeclineModal(true);
                  setBookingID(item._id);
                }}
                disabled={isApproving || isDeclining}
              >
                {t("booking-requests.refuse")}
              </button>
              <button
                className="booking-request-item-actions-button"
                onClick={async () => {
                  setIsApproving(true);
                  await approve(item._id);
                }}
                disabled={isApproving || isDeclining}
              >
                {isApproving
                  ? t("booking-requests.approving")
                  : t("booking-requests.approve")}
              </button>
            </>
          )}

          {approvedUser && (
            <>
              <a
                className="booking-request-item-actions-button"
                onClick={() => {
                  setUserDetailsModal(true);
                }}
              >
                {t("booking-requests.view-details")}
              </a>
              {item.dateStart === dateNow && (
                <Link
                  className="booking-request-item-actions-button"
                  to={{
                    pathname: `qr-reader/${item._id}`,
                    state: { from: location.pathname },
                  }}
                >
                  {t("booking-requests.confirm-pickup")}
                </Link>
              )}
            </>
          )}

          {["with_customer"].includes(item.status) && (
            <Link
              to={`qr-code/dropoff/${item._id}`}
              className="booking-item-buttons-button"
            >
              {t("booking-requests.drop-off-qr")}
            </Link>
          )}
        </div>
      </div>
      <Modal modalOpen={declineModal} toggleModal={setDeclineModal}>
        <div className="decline-modal">
          <h1> {t("booking-requests.refusal-reason")}</h1>
          <TextArea
            containerClassName="decline-modal-text"
            placeholder={t("booking-requests.refusal-reason-optional")}
            value={refusalReason}
            setValue={setRefusalReason}
          ></TextArea>
          <div
            className={classNames(
              "decline-modal-button",
              isDeclining && "disabled"
            )}
            onClick={async () => {
              setIsDeclining(true);
              await refuse();
            }}
          >
            {isDeclining
              ? t("booking-requests.refusing")
              : t("booking-requests.refuse")}
          </div>
        </div>
      </Modal>
      {approvedUser && (
        <Modal modalOpen={userDetailsModal} toggleModal={setUserDetailsModal}>
          <div className="user-details-modal">
            <h1> {t("booking-requests.user-details")}</h1>
            <div className="user-details-modal-container">
              <div className="item-a">
                <strong>{t("booking-requests.email")}</strong>
              </div>
              <a
                className="item-b link"
                href={`mailto:${approvedUser["email"]}`}
              >
                {approvedUser["email"]}
              </a>
              <div className="item-a">
                <strong>{t("booking-requests.number")}</strong>
              </div>
              <div className="item-b">{approvedUser["number"]}</div>
              <div className="item-a">
                <strong>{t("booking-requests.prefered-languages")}</strong>
              </div>
              <div className="item-b">{item.userID.preferedLanguage}</div>
              <div className="item-c">
                <em>{t("booking-requests.language-advise")}</em>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookingRequestsItem;
