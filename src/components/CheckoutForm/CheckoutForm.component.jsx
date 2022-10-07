import React, { useRef, useState, useEffect } from "react";
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
import { useUserContext } from "../../context/user";
import { stripeKey } from "../../api/config";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
const stripe = loadStripe(stripeKey);

const CheckoutForm = ({ step, setStep, data }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [clickedIndex, setClickedIndex] = useState();
  const { state, GET_CLIENT_SECRET, RESET_CLIENT_SECRET } = useUserContext();
  const { notification } = useNotificationHandler();
  useEffect(() => {
    const onPageLoad = async () => {
      setIsReady(false);
      RESET_CLIENT_SECRET();
      try {
        await GET_CLIENT_SECRET(data);
      } catch (err) {
        notification([err.message], true, 100);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };
    onPageLoad();
  }, []);
  return (
    <div className="checkout">
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
        {state.clientSecret && (
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
            <Checkout
              setPaymentLoading={setPaymentLoading}
              isPaymentLoading={isPaymentLoading}
              isReady
              setIsReady={setIsReady}
              data={data}
            ></Checkout>
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
