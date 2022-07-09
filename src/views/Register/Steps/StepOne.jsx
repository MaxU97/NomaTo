import React from "react";
import Input from "../../../components/Input/Input.component";
import { useState } from "react";
import validator from "validator";
import { preRegEmail } from "../../../api/auth";
import { useTranslation } from "react-i18next";
const StepOne = ({ nextStep = () => {}, setReturnEmail = () => {} }) => {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmError, setConfirmError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [passwordConds, setPasswordConds] = useState({
    minLength: { text: t("pw-requirements.characters"), met: false },
    upperCase: { text: t("pw-requirements.upper"), met: false },
    lowerCase: { text: t("pw-requirements.lower"), met: false },
    symbol: { text: t("pw-requirements.symbol"), met: false },
    number: { text: t("pw-requirements.number"), met: false },
  });
  const [confirmPW, setConfirmPW] = useState("");
  const [strongPassword, setStrongPassword] = useState(true);

  const CheckAndSetEmail = (event) => {
    setEmail(event);
    const validate = validator.isEmail(event);

    if (validate) {
      setEmailError(validate);
    } else {
      setEmailError(validate);
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

  const validateFields = () => {
    var boolToReturn = true;
    const validatePW = validator.isStrongPassword(password);

    if (!email) {
      boolToReturn = false;
    }
    if (!password && !validatePW && !passwordError) {
      boolToReturn = false;
    }
    if (!confirmPW && !confirmError) {
      boolToReturn = false;
    }

    return boolToReturn;
  };

  const sendForm = async () => {
    const validate = validateFields();
    try {
      if (validate) {
        const props = { email: email, password: password };

        const emailToReturn = await preRegEmail(props);
        setReturnEmail(emailToReturn);
        nextStep();
      } else {
        alert("Please fill all fields");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <Input
        placeholder={t("register.email")}
        value={email}
        setValue={CheckAndSetEmail}
        // containerClass={!emailError && "register-error"}
        error={!emailError}
        // className="register-form-field"
        errorText={t("register.valid-email")}
      ></Input>
      <Input
        placeholder={t("register.password")}
        value={password}
        setValue={CheckAndSetPass}
        error={!passwordError}
        errorText={Object.keys(passwordConds).map(
          (key) => !passwordConds[key].met && passwordConds[key].text + " "
        )}
        type="password"
      ></Input>
      <Input
        placeholder={t("register.confirm-pw")}
        value={confirmPW}
        error={!confirmError}
        setValue={ConfirmAndSetPass}
        type="password"
        errorText={t("register.no-match")}
      ></Input>
      <a
        onClick={() => {
          sendForm();
        }}
        className="register-form-field-button"
      >
        {t("register.next")}
      </a>
    </>
  );
};
export default StepOne;
