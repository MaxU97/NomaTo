import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  IbanElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createStripe } from "../../api/auth";
import Input from "../../components/Input/Input.component";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { useLocation } from "react-router-dom";
import validator from "validator";
import { SpinnerIcon } from "../../assets/Icons";
export const CardInfo = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const { notification } = useNotificationHandler();

  const [detailsSent, toggleDetailsSent] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");

  const [iban, setIBAN] = useState("");
  const [ibanError, setIbanError] = useState("");

  const [loading, toggleLoading] = useState(false);

  const validateFields = async () => {
    var validated = true;
    if (!name) {
      validated = false;
      setNameError(t("payment-register.name-error"));
    }

    if (!surname) {
      validated = false;
      setSurnameError(t("payment-register.surname-error"));
    }

    const validateIBAN = validator.isIBAN(iban);
    if (!validateIBAN) {
      validated = false;
      setIbanError(t("payment-register.iban-error"));
    }
    return validated;
  };

  const submitDetails = async () => {
    toggleLoading(true);
    const validated = await validateFields();
    if (validated && !detailsSent) {
      try {
        const response = await createStripe({
          name: name,
          surname: surname,
          iban: iban,
        });
        notification([response]);
        toggleLoading(false);
        setTimeout(() => {
          if (location.state) {
            window.location.href = location.state.from;
          } else {
            window.location.href = "/";
          }
        }, 2000);
      } catch (err) {
        notification([err.message], true);
      }
    }
  };

  return (
    <>
      <div className="payment-details-fields-double">
        <Input
          showInformation={false}
          errorText={nameError}
          error={!!nameError}
          value={name}
          setValue={(e) => {
            setName(e);
            setNameError("");
          }}
          placeholder={t("payment-register.name")}
        ></Input>
        <Input
          showInformation={false}
          errorText={surnameError}
          error={!!surnameError}
          value={surname}
          setValue={(e) => {
            setSurname(e);
            setSurnameError("");
          }}
          placeholder={t("payment-register.surname")}
        ></Input>
      </div>
      <Input
        showInformation={false}
        errorText={ibanError}
        error={!!ibanError}
        value={iban}
        setValue={(e) => {
          setIBAN(e);
          setIbanError("");
        }}
        placeholder={t("payment-register.IBAN")}
      ></Input>
      <a
        className="payment-details-submit"
        onClick={() => {
          submitDetails();
        }}
        disabled={loading}
      >
        {loading ? <SpinnerIcon></SpinnerIcon> : t("payment-register.submit")}
      </a>
    </>
  );
};
