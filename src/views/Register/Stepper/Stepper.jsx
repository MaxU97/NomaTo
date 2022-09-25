import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../services/responsive.service";
import "./stepper.scss";
const Stepper = ({ activeStep = 0 }) => {
  const { isMobile } = useWindowDimensions();
  const { t } = useTranslation();
  return (
    <div className="stepper">
      <div className="stepper-field">
        <div
          className={classNames(
            "stepper-field-number",
            activeStep >= 0 && "active"
          )}
        >
          1
        </div>
        {!isMobile && t("register.stepper.step1")}
      </div>
      <div className="stepper-divider">
        <div className="stepper-divider-content">
          <div
            className={classNames(
              "stepper-divider-content-active",
              activeStep >= 1 && "active"
            )}
          ></div>
        </div>
      </div>

      <div className="stepper-field">
        <div
          className={classNames(
            "stepper-field-number",
            activeStep >= 1 && "active"
          )}
        >
          2
        </div>
        {!isMobile && t("register.stepper.step2")}
      </div>
      <div className="stepper-divider">
        <div className="stepper-divider-content">
          <div
            className={classNames(
              "stepper-divider-content-active",
              activeStep >= 2 && "active"
            )}
          ></div>
        </div>
      </div>

      <div className="stepper-field">
        <div
          className={classNames(
            "stepper-field-number",
            activeStep >= 2 && "active"
          )}
        >
          3
        </div>
        {!isMobile && t("register.stepper.step3")}
      </div>
      <div className="stepper-divider">
        <div className="stepper-divider-content">
          <div
            className={classNames(
              "stepper-divider-content-active",
              activeStep >= 3 && "active"
            )}
          ></div>
        </div>
      </div>

      <div className="stepper-field">
        <div
          className={classNames(
            "stepper-field-number",
            activeStep == 3 && "active"
          )}
        >
          4
        </div>
        {!isMobile && t("register.stepper.step4")}
      </div>
    </div>
  );
};

export default Stepper;
