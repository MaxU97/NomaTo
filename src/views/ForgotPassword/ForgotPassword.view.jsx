import React, { useState } from "react";
import "./forgotpassword.scss";
import validator from "validator";
import HoverTooltip from "../../components/HoverTooltip/HoverTooltip.component";
import Input from "../../components/Input/Input.component";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import {
  resendForgotPassword,
  sendForgetEmail,
  sendForgotCode,
  sendResetPassword,
} from "../../api/auth";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const ForgotPassword = () => {
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();
  const [emailError, setEmailError] = useState(true);
  const [email, setEmail] = useState("");
  const [codeResent, setCodeResent] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(60);

  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [strongPassword, setStrongPassword] = useState(true);
  const [confirmError, setConfirmError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordConds, setPasswordConds] = useState({
    minLength: { text: "Minimum 8 characters", met: false },
    upperCase: { text: "1 uppercase letter", met: false },
    lowerCase: { text: "1 lowercase letter", met: false },
    symbol: { text: "1 symbol", met: false },
    number: { text: "1 number", met: false },
  });

  const [code, setCodeText] = useState();
  const [codeError, setCodeError] = useState();
  const [codeErrorText, setCodeErrorText] = useState("");
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
  const CheckAndSetEmail = (event) => {
    setEmail(event);
    const validate = validator.isEmail(event);

    if (validate) {
      setEmailError(validate);
    } else {
      setEmailError(validate);
    }
  };
  const validateFields = () => {
    var boolToReturn = true;

    if (!email) {
      boolToReturn = false;
    }

    return boolToReturn;
  };

  const validatePasswords = () => {
    var boolToReturn = true;
    const validatePW = validator.isStrongPassword(password);

    if (!password && !validatePW && passwordError) {
      boolToReturn = false;
    }
    if (!confirmPW && !confirmError) {
      boolToReturn = false;
    }

    return boolToReturn;
  };
  const sendPassword = async () => {
    const validate = validatePasswords();
    debugger;
    try {
      if (validate) {
        const props = { email: email, password: password };

        const message = await sendResetPassword(props);
        notification([message]);
        window.location.href = "/login";
      } else {
        notification(["Please fill all fields"], true);
      }
    } catch (err) {
      notification([err.message], true);
    }
  };

  const sendConfirmation = async () => {
    if (code) {
      const props = { email: email, code: code };
      try {
        const message = await sendForgotCode(props);
        setStep(step + 1);
      } catch (err) {
        setCodeError(true);
        setCodeErrorText(err.message);
      }
    } else {
      setCodeError(true);
      setCodeErrorText(t("forgot-pw.fill-code"));
    }
  };

  const sendForm = async () => {
    const validate = validateFields();
    try {
      if (validate) {
        const props = { email: email };
        await sendForgetEmail(props);
        setStep(step + 1);
      } else {
        setEmailError(false);
      }
    } catch (err) {
      notification([err.message], true);
    }
  };

  const resendCode = async () => {
    if (!codeResent) {
      await resendForgotPassword({ email: email });
      setCodeResent(true);
    }
  };

  const ConfirmAndSetPass = (event) => {
    if (strongPassword) {
      if (event === password) {
        setConfirmError(true);
      } else {
        setConfirmError(false);
      }
      if (event.length <= 0) {
        setConfirmError(true);
      }
    } else {
      setConfirmError(true);
    }

    setConfirmPW(event);
  };
  const CheckAndSetPass = (event) => {
    var pw = event;
    var newConds = passwordConds;

    const validate = validator.isStrongPassword(event);
    if (pw.length != 0) {
      if (event.length < 8) {
        newConds.minLength.met = false;
      } else {
        newConds.minLength.met = true;
      }
      const onlyUpper = pw.replace(/[^A-Z]/g, "");
      if (onlyUpper.length > 0) {
        newConds.upperCase.met = true;
      } else {
        newConds.upperCase.met = false;
      }

      const onlyLower = pw.replace(/[^a-z]/g, "");
      if (onlyLower.length > 0) {
        newConds.lowerCase.met = true;
      } else {
        newConds.lowerCase.met = false;
      }

      const onlySymbols = pw.replace(/[a-zA-Z0-9]/g, "");
      if (onlySymbols.length > 0) {
        newConds.symbol.met = true;
      } else {
        newConds.symbol.met = false;
      }

      const onlyNumbers = pw.replace(/[^0-9]/g, "");
      if (onlyNumbers.length > 0) {
        newConds.number.met = true;
      } else {
        newConds.number.met = false;
      }
      setPasswordConds(newConds);
      setPasswordError(validate);
      setStrongPassword(validate);
    } else {
      setStrongPassword(true);
      setPasswordError(false);
    }
    setPassword(event);
  };

  return (
    <div className="forgot-pw">
      <div className="container container-s forgot-pw-container">
        <h1>{t("forgot-pw.title")}</h1>
        {step == 0 && (
          <>
            <Input
              placeholder="Email"
              value={email}
              setValue={CheckAndSetEmail}
              containerClass={!emailError && "forgot-pw-error"}
              className="forgot-pw-field"
            >
              <HoverTooltip
                content={!emailError && "Please enter a valid email"}
                inVar={!emailError}
                style={{ transform: "translateY(25%)" }}
              ></HoverTooltip>
            </Input>
            <a
              onClick={() => {
                sendForm();
              }}
              className="forgot-pw-button"
            >
              Next Step
            </a>
          </>
        )}
        {step == 1 && (
          <>
            <div className="forgot-pw-text">
              {t("forgot-pw.email-code-1")} <strong>{email} </strong>
              {t("forgot-pw.email-code-2")}.
              <a
                onClick={() => {
                  resendCode();
                }}
              >
                {" "}
                {t("forgot-pw.resend-code")}. {codeResent && `(${time})`}
              </a>
            </div>
            <Input
              placeholder="Confirmation Code"
              value={code}
              setValue={setCodeText}
              containerClass={codeError && "forgot-pw -error"}
              className="forgot-pw-field"
            >
              <HoverTooltip
                content={codeErrorText}
                inVar={codeError}
                style={{ transform: "translateY(25%)" }}
              ></HoverTooltip>
            </Input>
            <a
              onClick={() => {
                sendConfirmation();
              }}
              className="forgot-pw-button"
            >
              Confirm
            </a>
          </>
        )}
        {step == 2 && (
          <>
            <Input
              placeholder="Password"
              value={password}
              setValue={CheckAndSetPass}
              containerClass={!passwordError && "register-error"}
              type="password"
              className="register-form-field"
            >
              <HoverTooltip
                content={Object.keys(passwordConds).map(
                  (key) =>
                    !passwordConds[key].met && (
                      <div>{passwordConds[key].text}</div>
                    )
                )}
                inVar={!strongPassword}
              ></HoverTooltip>
            </Input>
            <Input
              placeholder="Confirm Password"
              value={confirmPW}
              containerClass={!confirmError && "register-error"}
              setValue={ConfirmAndSetPass}
              type="password"
              className="register-form-field"
            >
              <HoverTooltip
                content={!confirmError && "Passwords do not match"}
                inVar={!confirmError}
              ></HoverTooltip>
            </Input>
            <a
              onClick={() => {
                sendPassword();
              }}
              className="register-form-field-button"
            >
              Next Step
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
