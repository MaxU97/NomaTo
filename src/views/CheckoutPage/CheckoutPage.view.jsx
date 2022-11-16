import React, { useEffect, useMemo, useState } from "react";
import NotFound from "../NotFound/NotFound";
import { CheckIcon, CloseIcon, SpinnerAnimationIcon } from "../../assets/Icons";
import "./checkoutpage.scss";
import { useTranslation } from "react-i18next";
import { sendBookingToOwner } from "../../api/booking";
export const CheckoutPage = () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const allParams =
    params.has("payment_intent") &&
    params.has("payment_intent_client_secret") &&
    params.has("itemID") &&
    params.has("redirect_status");

  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendBooking = async () => {
      if (allParams) {
        const payment_intent = params.get("payment_intent_client_secret");
        const intentID = params.get("payment_intent");
        try {
          await sendBookingToOwner(payment_intent, intentID);
          setLoading(false);
          setTimeout(() => {
            window.location.href = `/bookings`;
          }, 2000);
        } catch (err) {
          console.log(err.message);
          setError(true);
          setLoading(false);
          setTimeout(() => {
            window.location.href = `/item/${params.get("itemID")}`;
          }, 2000);
        }
      }
    };
    sendBooking();
  }, []);

  return allParams ? (
    <div className="checkout-page">
      {loading ? (
        <>
          <h1>{t("checkout.processing")}</h1>
          <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
          <p>{t("checkout.no-refresh")}</p>
        </>
      ) : error ? (
        <>
          <h1>{t("checkout.wrong")}</h1>
          <CloseIcon className="error-cross"></CloseIcon>
          <p>{t("checkout.wrong2")}</p>
        </>
      ) : (
        <>
          <h1>{t("checkout.success")}</h1>
          <CheckIcon className="check-mark"></CheckIcon>
          <p>{t("checkout.success2")}</p>
        </>
      )}
    </div>
  ) : (
    <NotFound></NotFound>
  );
};
