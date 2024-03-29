import React, { useState } from "react";
import "./changepassword.scss";
import validator from "validator";

import Input from "../../components/Input/Input.component";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import {
  resendForgotPassword,
  sendChangePassword,
  sendForgetEmail,
  sendForgotCode,
  sendResetPassword,
} from "../../api/auth";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();
  const { notification } = useNotificationHandler();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPW, setConfirmPW] = useState("");
  const [confirmError, setConfirmError] = useState(true);

  const [strongPassword, setStrongPassword] = useState(true);
  const [passwordConds, setPasswordConds] = useState({
    minLength: { text: t("pw-requirements.characters"), met: false },
    upperCase: { text: t("pw-requirements.upper"), met: false },
    lowerCase: { text: t("pw-requirements.lower"), met: false },
    symbol: { text: t("pw-requirements.symbol"), met: false },
    number: { text: t("pw-requirements.number"), met: false },
  });

  const validatePasswords = () => {
    var boolToReturn = true;
    const validatePW = validator.isStrongPassword(password);

    if (!password && !validatePW && passwordError) {
      boolToReturn = false;
    }
    if (!confirmPW && !confirmError) {
      boolToReturn = false;
    }
    if (!oldPassword) {
      boolToReturn = false;
    }

    return boolToReturn;
  };
  const sendPassword = async () => {
    const validate = validatePasswords();
    try {
      if (validate) {
        const props = { oldPassword: oldPassword, password: password };

        const message = await sendChangePassword(props);
        notification([message]);
        window.location.href = "/login";
      } else {
        notification([t("change-pw.fill-fields")], true);
      }
    } catch (err) {
      notification([err.message], true);
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
    <div className="change-pw">
      <div className="container container-s change-pw-container">
        <h1>{t("change-pw.title")}</h1>
        <div className="change-pw-wrapper">
          <Input
            placeholder={t("change-pw.old-pw")}
            value={oldPassword}
            setValue={setOldPassword}
            type="password"
          ></Input>
          <Input
            placeholder={t("change-pw.new-pw")}
            value={password}
            setValue={CheckAndSetPass}
            type="password"
            error={!strongPassword}
            errorText={Object.keys(passwordConds).map(
              (key) => !passwordConds[key].met && passwordConds[key].text + " "
            )}
          ></Input>
          <Input
            placeholder={t("change-pw.confirm-pw")}
            value={confirmPW}
            setValue={ConfirmAndSetPass}
            type="password"
            error={!confirmError}
            errorText={t("change-pw.no-match")}
          ></Input>
          <a
            onClick={() => {
              sendPassword();
            }}
            className="change-pw-button"
          >
            {t("change-pw.change")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
