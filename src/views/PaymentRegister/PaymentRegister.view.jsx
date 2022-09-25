import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { stripeKey } from "../../api/config";
import { useUserContext } from "../../context/user";
import { CardInfo } from "./CardInfo";
import "./paymentregister.scss";
const stripe = loadStripe(stripeKey);

const PaymentRegister = () => {
  useEffect(() => {}, []);
  const { t } = useTranslation();
  const { state, GET_CLIENT_SECRET } = useUserContext();

  return (
    <div className="container-m" style={{ paddingTop: "140px" }}>
      <div className="payment-details">
        <h1>
          {state.user.sellerCompleted
            ? t("payment-register.update-title")
            : t("payment-register.title")}
        </h1>
        <div className="payment-details-fields">
          <Elements stripe={stripe}>
            <CardInfo></CardInfo>
          </Elements>
        </div>
        <p className="payment-details-tos">
          {t("payment-register.tos")}{" "}
          <a target="_blank">{t("payment-register.our-tos")}</a>{" "}
          {t("payment-register.tos2")}{" "}
          <a target="_blank" href="https://stripe.com/legal/connect-account">
            {t("payment-register.stripe-tos")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentRegister;
