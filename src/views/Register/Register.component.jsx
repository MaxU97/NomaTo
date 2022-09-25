import React, { useState } from "react";
import StepOne from "./Steps/StepOne";
import "./register.scss";
import { useTranslation } from "react-i18next";
import Stepper from "./Stepper/Stepper";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import useWindowDimensions from "../../services/responsive.service";
const Register = () => {
  const { isMobile } = useWindowDimensions();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="register-page">
      <div className="container container-m register-container">
        <h1>
          {t("login.reg-message-1")} <a>{t("login.reg-message-2")}</a>
        </h1>
        <div className="register-content">
          {isMobile && (
            <div className="register-content-r">
              <h4>
                {step == 0 && t("register.stepper.step1")}
                {step == 1 && t("register.stepper.step2")}
                {step == 2 && t("register.stepper.step3")}
                {step == 3 && t("register.stepper.step4")}
              </h4>
              <Stepper activeStep={step}></Stepper>
            </div>
          )}
          <div className="register-content-l">
            <div className="register-form">
              {step == 0 && (
                <StepOne
                  nextStep={() => {
                    setStep(step + 1);
                  }}
                  setReturnEmail={setEmail}
                ></StepOne>
              )}

              {step == 1 && (
                <StepTwo
                  nextStep={() => {
                    setStep(step + 1);
                  }}
                  email={email}
                ></StepTwo>
              )}
              {step == 2 && (
                <StepThree
                  nextStep={() => {
                    setStep(step + 1);
                  }}
                  email={email}
                  setReturnPhone={setPhone}
                ></StepThree>
              )}
              {step == 3 && <StepFour email={email} phone={phone}></StepFour>}
            </div>
          </div>

          {!isMobile && (
            <div className="register-content-r">
              <Stepper activeStep={step}></Stepper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
