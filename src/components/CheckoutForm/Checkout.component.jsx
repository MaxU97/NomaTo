import React, { useRef } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { SpinnerIcon } from "../../assets/Icons";
import classNames from "classnames";
import { useUserContext } from "../../context/user";
import { recordBooking } from "../../api/booking";
import { websitUrl } from "../../api/config";
import { useTranslation } from "react-i18next";
const Checkout = ({
  isReady,
  setIsReady,
  setPaymentLoading,
  isPaymentLoading,
  loadForm,
  data,
}) => {
  const { t } = useTranslation();
  const redirectLink = `${websitUrl}/checkout/`;
  const saveCheck = useRef();
  const elements = useElements();
  const stripe = useStripe();
  const { state } = useUserContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);
    if (!stripe || !elements) {
      return;
    }

    let error;
    if (loadForm) {
      await recordBooking({
        client_secret: state.clientSecret,
        status: "unfinished",
        saveCard: saveCheck.current.checked,
        itemData: data,
      });
      error = await stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: redirectLink,
          },
        })
        .then((result) => {
          if (result.error) {
            setPaymentLoading(false);
          } else {
          }
        });
    } else {
      await recordBooking({
        client_secret: state.clientSecret,
        status: "unfinished",
        saveCard: "existing_card",
        itemData: data,
      });
      await stripe
        .confirmCardPayment(state.clientSecret, {
          return_url: window.location.href,
        })
        .then((result) => {
          if (result.error) {
            setPaymentLoading(false);
          } else {
            const redirectlink =
              redirectLink +
              `?payment_intent=${result.paymentIntent.id}&payment_intent_client_secret=${result.paymentIntent.client_secret}&redirect_status=succeeded`;
            window.location.replace(redirectlink);
          }
        });
    }
  };

  return (
    <>
      <PaymentElement
        className={classNames("card-info", loadForm ? "" : "hidden")}
        onReady={() => {
          setIsReady(true);
        }}
      ></PaymentElement>
      {loadForm && (
        <div className="save-details">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            value="accept"
            ref={saveCheck}
          ></input>
          <label for="terms">{t("checkout.save-details")}</label>
        </div>
      )}

      <a
        className="pay-button"
        disabled={isPaymentLoading || !state.clientSecret}
        onClick={handleSubmit}
      >
        {isPaymentLoading ? (
          <SpinnerIcon></SpinnerIcon>
        ) : !state.clientSecret ? (
          t("checkout.select-methods")
        ) : (
          t("checkout.send-booking")
        )}
      </a>
    </>
  );
};

export default Checkout;
