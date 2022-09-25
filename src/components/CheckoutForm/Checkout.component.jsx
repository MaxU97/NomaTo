import React, { useRef } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { SpinnerIcon } from "../../assets/Icons";
import classNames from "classnames";
import { useUserContext } from "../../context/user";
import { recordBooking } from "../../api/booking";
import { websitUrl } from "../../api/config";
import { useTranslation } from "react-i18next";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
const Checkout = ({
  isReady,
  setIsReady,
  setPaymentLoading,
  isPaymentLoading,
  data,
}) => {
  const { t } = useTranslation();

  const redirectLink = `${websitUrl}/checkout/`;
  const elements = useElements();
  const stripe = useStripe();
  const { state } = useUserContext();
  const { notification } = useNotificationHandler();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);
    if (!stripe || !elements) {
      return;
    }

    let error;
    await recordBooking({
      client_secret: state.clientSecret,
      status: "unfinished",
      itemData: data,
    });

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${redirectLink}?itemID=${data.itemID}`,
        },
      })
      .then((result) => {
        if (result.error) {
          setPaymentLoading(false);
          notification([result.error.message], true);
        } else {
        }
      });
  };

  return (
    <>
      <PaymentElement
        className={classNames("card-info")}
        onReady={() => {
          setIsReady(true);
        }}
      ></PaymentElement>

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
