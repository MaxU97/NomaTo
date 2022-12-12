import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resendPhoneCode, sendPhoneCode } from "../../../api/auth";
import Input from "../../../components/Input/Input.component";
import { useUserContext } from "../../../context/user";

const StepFour = ({ email = "", phone = "" }) => {
  const { SIGNUP } = useUserContext();
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [codeResent, setCodeResent] = useState(false);
  const [time, setTime] = useState(60);

  const setCodeText = (event) => {
    setError(false);
    setErrorText("");
    setCode(event);
  };

  const sendConfirmation = async () => {
    debugger;
    if (code) {
      const props = { email: email, phone: phone, code: code };
      try {
        const _id = await sendPhoneCode(props);
        const signedUp = await SIGNUP({ _id: _id });
        if (signedUp) {
          window.location.reload();
        }
      } catch (err) {
        setError(true);
        setErrorText(err.message);
      }
    } else {
      setError(true);
      setErrorText(t("register.fill-code"));
    }
  };
  useEffect(() => {
    if (codeResent) {
      if (time > 0) {
        setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        setCodeResent(false);
        setTime(60);
      }
    }
  }, [codeResent, time]);

  const resendCode = async () => {
    if (!codeResent) {
      await resendPhoneCode({ email: email, phone: phone });
      setCodeResent(true);
    }
  };
  return (
    <div className="register-form-step-4">
      <div className="register-form-field-text">
        {t("register.email-code-1")}{" "}
        <strong>{phone.charAt(0) == "+" ? phone : "+" + phone} </strong>
        {t("register.email-code-2")}.{" "}
        <a
          onClick={() => {
            resendCode();
          }}
        >
          {" "}
          {t("register.resend-code")}. {codeResent && `(${time})`}
        </a>
      </div>
      <Input
        placeholder={t("register.confirm-code")}
        value={code}
        setValue={setCodeText}
        containerClass={error && "register-error"}
        className="register-form-field"
        error={error}
        errorText={errorText}
      ></Input>
      <a
        onClick={() => {
          sendConfirmation();
        }}
        className="register-form-field-button"
      >
        {t("register.next")}
      </a>
    </div>
  );
};

export default StepFour;
