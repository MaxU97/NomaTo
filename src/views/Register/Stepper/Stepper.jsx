import classNames from "classnames";
import React from "react";
import "./stepper.scss";
const Stepper = ({ activeStep = 0 }) => {
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
        Enter Account Details
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
        Confirm email
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
        Enter phone number
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
        Confirm phone number
      </div>
    </div>
  );
};

export default Stepper;
