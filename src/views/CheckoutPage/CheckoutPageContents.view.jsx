import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { sendBookingToOwner } from "../../api/booking";
import { SpinnerAnimationIcon, SpinnerIcon } from "../../assets/Icons";
import { Redirect } from "react-router-dom";
export const CheckoutPageContents = ({ clientSecret, intentID }) => {
  const stripe = useStripe();
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
          setError("Something Went Wrong");
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
            <h1>Something Went Wrong</h1>
            <p>Please try to make a booking again.</p>
          </>
        ) : (
          <>
            <h1>Processing payment method</h1>
            <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
            <p>
              Please do not close or refresh this page. You will be redirected
              automatically once the payment method has been confirmed.
            </p>
          </>
        )
      ) : callback ? (
        window.location.replace("/")
      ) : (
        <div>Something Went Wrong</div>
      )}
    </div>
  );
};
