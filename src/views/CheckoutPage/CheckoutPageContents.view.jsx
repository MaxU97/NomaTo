import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { sendBookingToOwner } from "../../api/booking";
import { SpinnerAnimationIcon, SpinnerIcon } from "../../assets/Icons";
import { useTranslation } from "react-i18next";
export const CheckoutPageContents = ({ clientSecret, intentID }) => {
  const stripe = useStripe();
  const { t } = useTranslation();
  const [paymentIntent, setPaymentIntent] = useState();
  const [reload, setReload] = useState(true);
  const [callback, setCallback] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchIntent() {
      if (!paymentIntent) {
        if (stripe && clientSecret) {
          stripe.retrievePaymentIntent(clientSecret).then((result) => {
            console.log();
            setPaymentIntent(result.paymentIntent);
          });
        } else {
          setReload(!reload);
        }
      } else {
        return;
      }
    }
    fetchIntent();
  }, [stripe]);

  useEffect(() => {
    async function send() {
      if (
        paymentIntent &&
        paymentIntent.status === "requires_capture" &&
        !callback
      ) {
        const sent = await sendBookingToOwner({
          clientSecret: paymentIntent.client_secret,
          intentID: intentID,
        });
        if (!sent) {
          setError(t("checkout.error"));
        }
        setLoading(false);
        setCallback(sent);
      }
    }
    send();
  }, [paymentIntent]);
  return (
    <div className="checkout-page">
      {loading ? (
        error ? (
          <>
            <h1>{t("checkout.error")}</h1>
            <p>{t("checkout.try-again")}</p>
          </>
        ) : (
          <>
            <h1>{t("checkout.processing")}</h1>
            <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
            <p>{t("checkout.no-refresh")}</p>
          </>
        )
      ) : callback ? (
        window.location.replace("/")
      ) : (
        <div>{t("checkout.error")}</div>
      )}
    </div>
  );
};
