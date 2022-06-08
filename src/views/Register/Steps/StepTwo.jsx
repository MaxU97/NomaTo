import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { resendEmailCode, sendEmailCode } from "../../../api/auth";
import HoverTooltip from "../../../components/HoverTooltip/HoverTooltip.component";
import Input from "../../../components/Input/Input.component";
const StepTwo = ({ nextStep = () => {}, email }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { t } = useTranslation();
  const [codeResent, setCodeResent] = useState(false);

  const [time, setTime] = useState(60);
  const sendConfirmation = async () => {
    if (code) {
      const props = { email: email, code: code };
      try {
        const message = await sendEmailCode(props);
        nextStep();
      } catch (err) {
        setError(true);
        setErrorText(err.message);
      }
    } else {
      setError(true);
      debugger;
      setErrorText(t("register.fill-code"));
    }
  };
  const setCodeText = (event) => {
    setError(false);
    setErrorText("");
    setCode(event);
  };

  const resendCode = async () => {
    if (!codeResent) {
      await resendEmailCode({ email: email });
      setCodeResent(true);
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
  return (
    <div className="register-form-step-2">
      <div className="register-form-field-text">
        {t("register.email-code-1")} <strong>{email} </strong>
        {t("register.email-code-2")}.
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
        placeholder="Confirmation Code"
        value={code}
        setValue={setCodeText}
        containerClass={error && "register-error"}
        className="register-form-field"
      >
        <HoverTooltip
          content={errorText}
          inVar={error}
          style={{ transform: "translateY(25%)" }}
        ></HoverTooltip>
      </Input>
      <a
        onClick={() => {
          sendConfirmation();
        }}
        className="register-form-field-button"
      >
        Next Step
      </a>
    </div>
  );
};
export default StepTwo;
