import React, { useEffect, useMemo, useState } from "react";
import NotFound from "../NotFound";
import { loadStripe } from "@stripe/stripe-js";
import { result } from "lodash";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutPageContents } from "./CheckoutPageContents.view";
import "./checkoutpage.scss";
import { stripeKey } from "../../api/config";
export const CheckoutPage = () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const stripe = loadStripe(stripeKey);

  const allParams =
    params.has("payment_intent") &&
    params.has("payment_intent_client_secret") &&
    params.has("redirect_status");

  const clientSecret = params.get("payment_intent_client_secret");
  const intentID = params.get("payment_intent");
  return allParams ? (
    <div className="container">
      <Elements stripe={stripe}>
        <CheckoutPageContents
          clientSecret={clientSecret}
          intentID={intentID}
        ></CheckoutPageContents>
      </Elements>
    </div>
  ) : (
    <NotFound></NotFound>
  );
};
