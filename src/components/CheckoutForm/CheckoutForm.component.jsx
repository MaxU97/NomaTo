import React, { useRef, useState, useEffect } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import {
  DefaultCardIcon,
  MoveIcon,
  PlusIcon,
  SpinnerIcon,
  VisaCardIcon,
} from "../../assets/Icons";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Checkout from "./Checkout.component";
import "./checkoutform.scss";
import { getPaymentMethods } from "../../api/booking";

import Input from "../Input/Input.component";
import { useUserContext } from "../../context/user";
import Skeleton from "react-loading-skeleton";
import { remove } from "lodash";
import classNames from "classnames";
import { stripeKey } from "../../api/config";

const CheckoutForm = ({ step, setStep, data }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [loadForm, setLoadForm] = useState(false);
  const [clickedIndex, setClickedIndex] = useState();
  const { state, GET_CLIENT_SECRET, RESET_CLIENT_SECRET } = useUserContext();

  const stripe = loadStripe(stripeKey);

  useEffect(() => {
    RESET_CLIENT_SECRET();
  }, []);
  const selectPayment = async (paymentID, index) => {
    if (index === clickedIndex) {
    } else {
      setClickedIndex(index);
      if (paymentID === "new") {
        setIsReady(false);
        RESET_CLIENT_SECRET();
        setLoadForm(true);
        data = { ...data, paymentID: paymentID };
        await GET_CLIENT_SECRET(data);
      } else {
        RESET_CLIENT_SECRET();
        setLoadForm(false);
        setPaymentLoading(true);
        data = { ...data, paymentID: paymentID };
        await GET_CLIENT_SECRET(data);
        setPaymentLoading(false);
      }
    }
  };

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case "visa":
        return <VisaCardIcon className="visa"></VisaCardIcon>;
      default:
        return <DefaultCardIcon></DefaultCardIcon>;
    }
  };
  return (
    <div className="checkout">
      <div className="checkout-methods">
        {state.paymentMethods.map((method, index) => {
          return (
            <div
              className={classNames(
                "checkout-methods-card",
                clickedIndex === index && "clicked"
              )}
              key={method.id}
              onClick={() => {
                selectPayment(method.id, index);
              }}
            >
              {getCardIcon(method.type)}
              {`••••${method.last}`}
            </div>
          );
        })}
        <div
          className={classNames(
            "checkout-methods-card",
            clickedIndex === -1 && "clicked"
          )}
          onClick={() => {
            selectPayment("new", -1);
          }}
        >
          <PlusIcon></PlusIcon>
        </div>
      </div>
      {step && (
        <a
          className="back-button"
          onClick={() => {
            setStep(step - 1);
          }}
        >
          <MoveIcon className="move-left-icon" />
        </a>
      )}
      <div className="checkout-form">
        <Elements
          key={state.clientSecret}
          stripe={stripe}
          options={{
            clientSecret: state.clientSecret,
            fonts: [
              {
                family: "Gilroy-Medium",
                src: "url(../../fonts/Gilroy-Medium.ttf)",
              },
            ],
            variables: {
              colorPrimary: "#0570de",
              colorBackground: "#ffffff",
              colorText: "#30313d",
              colorDanger: "#b44f4f",
              fontFamily: "Gilroy-Medium",
              spacingUnit: "2px",
              borderRadius: "4px",
            },
          }}
        >
          {!isReady && (
            <div className="checkout-form-loading">
              <SpinnerIcon></SpinnerIcon>
            </div>
          )}

          <Checkout
            setPaymentLoading={setPaymentLoading}
            isPaymentLoading={isPaymentLoading}
            isReady
            setIsReady={setIsReady}
            loadForm={loadForm}
            data={data}
          ></Checkout>
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutForm;
