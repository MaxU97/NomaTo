import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal.component";
import "./bookingmodal.scss";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import Input from "../Input/Input.component";
import Calendar from "../Calendar/Calendar.component";
import "react-calendar/dist/Calendar.css";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isWithinInterval from "date-fns/isWithinInterval";
import { CSSTransition } from "react-transition-group";
import { getCurrentLanguage } from "../../services/language.service";
import _ from "lodash";
import moment from "moment";
import CheckoutForm from "../CheckoutForm/CheckoutForm.component";

import {
  getTotalPrice,
  getNoDiscountPrice,
  getServiceCharge,
} from "../../services/price.service";
import { useUtilityContext } from "../../context/utility";
export const BookingModal = ({
  modalOpen,
  toggleModal,
  title = "Request a booking",
  minRent,
  rentPriceDay,
  rentPriceWeek,
  rentPriceMonth,
  itemQty,
  itemID,
  euroLocale,
  bookedDates,
}) => {
  // var today = new Date();
  // // var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  // // var twoDays = new Date(today.getTime() + 24 * 60 * 60 * 1000 * 2);
  // // var threeDays = new Date(today.getTime() + 24 * 60 * 60 * 1000 * 3);
  // var week = new Date(today.getTime() + 24 * 60 * 60 * 1000 * 7);
  let disabledDates = [];

  const tcCheck = useRef();
  const { state: utilityState } = useUtilityContext();
  const [dataToSend, setDataToSend] = useState();
  const [isIntentLoading, setIntentLoading] = useState(false);

  const [qtyWant, setQtyWant] = useState("");
  const [comment, setComment] = useState("");
  const [dayCount, setDayCount] = useState(0);

  const [daySummary, setDaySummary] = useState("");
  const [priceSummary, setPriceSummary] = useState("");
  const [discountSummary, setDiscountSummary] = useState("");
  const [totalSummary, setTotalSummary] = useState("");
  const [serviceSummary, setServiceSummary] = useState("");
  const [step, setStep] = useState(0);
  const { t } = useTranslation();

  const [fieldsValidated, setFieldsValidated] = useState(false);

  const defaultSummary = {
    day: { range: "", total: "0 Days" },
    price: {
      title: "0 items @ " + euroLocale.format(0) + " x 0 days",
      result: euroLocale.format(0),
    },
    discount: {},
    total: {
      title: "Total Price",
      result: euroLocale.format(0),
    },
  };

  const producePriceSummary = () => {
    const dayString = getDateCount();
    let price = {};
    let discount = {};
    let total = {};
    let service = {};
    let day = {};

    day = { range: getDateRange(), total: getDateCount() };

    const totalPrice = getTotalPrice(
      rentPriceDay,
      rentPriceWeek,
      rentPriceMonth,
      dates.start,
      dates.end
    );

    const noDiscountPrice = getNoDiscountPrice(
      rentPriceDay,
      dates.start,
      dates.end
    );
    const serviceCharge = getServiceCharge(
      totalPrice,
      utilityState.serviceCharge
    );

    price = {
      title:
        qtyWant +
        " items @ " +
        euroLocale.format(rentPriceDay) +
        " x " +
        dayString,
      result: euroLocale.format(noDiscountPrice * qtyWant),
    };

    service = {
      title: "Service Charge",
      result: euroLocale.format(serviceCharge * qtyWant),
    };

    total = {
      title: "Total Price",
      result: euroLocale.format((totalPrice + serviceCharge) * qtyWant),
    };

    if (dayCount < 7) {
      discount = {};
    } else if (7 <= dayCount && dayCount < 30) {
      discount = {
        title: "Savings due to 7+ days discount",
        result: euroLocale.format((totalPrice - noDiscountPrice) * qtyWant),
      };
    } else if (dayCount >= 30) {
      discount = {
        title: "Savings due to 30+ days discount",
        result: euroLocale.format((totalPrice - noDiscountPrice) * qtyWant),
      };
    }

    return { day, price, service, discount, total };
  };

  const getDateCount = () => {
    if (dates) {
      let dayString = dayCount + " ";

      if (dayCount == 1) {
        dayString = dayString + t("booking-modal.day-single");
      } else {
        dayString = dayString + t("booking-modal.day-multiple");
      }
      return dayString;
    } else {
      return "0 Days";
    }
  };

  const getDateRange = () => {
    let dateString = dates["start"].toLocaleString(getCurrentLanguage(), {
      day: "numeric",
      month: "short",
    });

    dateString =
      dateString +
      " - " +
      dates["end"].toLocaleString(getCurrentLanguage(), {
        day: "numeric",
        month: "short",
      });

    return dateString;
  };

  const [dates, setDates] = useState({}); //actual dates
  const [dateRange, setDateRange] = useState({}); //variable dates
  const [qtyError, setQtyError] = useState("");
  const [tcError, setTCError] = useState("");
  const [calendarError, setCalendarError] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dateRange)) {
      setDates({ start: dateRange.from, end: dateRange.to });

      let start = moment(dateRange.from);
      let end = moment(dateRange.to);
      setDayCount(end.diff(start, "days"));
    } else {
      setDates({});
      setDayCount(0);
    }
  }, [dateRange]);

  const nextStep = async () => {
    const validated = await validateFields();
    if (validated) {
      setIntentLoading(true);
      await sendCard();
      setIntentLoading(false);
      setTCError("");
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (!qtyError && !calendarError && qtyWant && !_.isEmpty(dates)) {
      const { day, price, service, discount, total } = producePriceSummary();
      setDaySummary(day);
      setPriceSummary(price);
      setServiceSummary(service);
      setDiscountSummary(discount);
      setTotalSummary(total);
    } else {
      setDaySummary(defaultSummary.day);
      setPriceSummary(defaultSummary.price);
      setDiscountSummary(defaultSummary.discount);
      setTotalSummary(defaultSummary.total);
    }
  }, [dates, qtyWant]);

  const validateFields = async () => {
    let returnBool = true;
    if (qtyWant) {
      if (qtyWant > itemQty) {
        setQtyError(`Only ${itemQty} available`);
        returnBool = false;
      }
    } else {
      setQtyError("Please select quantity");
      returnBool = false;
    }

    if (_.isEmpty(dates)) {
      if (!calendarError) {
        setCalendarError("Please select dates");
        returnBool = false;
      }
    }

    if (!tcCheck.current.checked) {
      returnBool = false;
      setTCError(true);
    }
    return returnBool;
  };

  const resetQtyValidation = () => {
    if (qtyWant) {
      if (qtyWant > itemQty) {
        setQtyError(`Only ${itemQty} available`);
        return;
      } else {
        setQtyError("");
      }
    } else {
      setQtyError("");
    }
  };
  const resetTCValidation = () => {
    if (tcCheck.current.checked) {
      setTCError(false);
    } else {
      setTCError(true);
    }
  };

  useEffect(() => {
    resetQtyValidation();
  }, [qtyWant]);

  const tcChecked = () => {
    resetTCValidation();
  };
  const sendCard = async () => {
    let data = {
      itemID,
      comment: comment,
      dateStart: dates["start"],
      dateEnd: dates["end"],
      qtyWant: qtyWant,
    };
    setDataToSend(data);
  };

  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="booking-modal">
        <h1>{title}</h1>
        {step == 0 && (
          <div className="booking-modal-contents">
            <div className="booking-modal-contents-left">
              <div className="booking-modal-contents-left-top">
                <Input
                  placeholder={t("booking-modal.quantity")}
                  className={classNames("booking-modal-input")}
                  value={qtyWant}
                  setValue={setQtyWant}
                  type="number"
                  maxLength={10}
                  containerClass={classNames(qtyError && "error")}
                >
                  <CSSTransition
                    in={!!qtyError}
                    timeout={500}
                    unmountOnExit
                    classNames="error-container"
                  >
                    <div className="hover-error">
                      <div className="hover-error-content">
                        {qtyError}
                        <div class="arrow-right"></div>
                      </div>
                    </div>
                  </CSSTransition>
                </Input>
                <div className="quantity-available">{itemQty} Available</div>
              </div>

              <Calendar
                calendarError={calendarError}
                setCalendarError={setCalendarError}
                dateRange={dateRange}
                setDateRange={setDateRange}
                bookedDates={bookedDates}
                minimumSelection={minRent}
              ></Calendar>

              <Input
                placeholder={t("booking-modal.comment")}
                className={classNames("booking-modal-input-100")}
                value={comment}
                setValue={setComment}
                maxLength={200}
              ></Input>
            </div>
            <div className="booking-modal-contents-right">
              <div className="price-summary">
                <div className="price-summary-dates">
                  {daySummary.range}
                  <div className="price-summary-dates-count">
                    {daySummary.total}
                  </div>
                </div>
                <div className="price-summary-prices">
                  <div className="summary">
                    {priceSummary && (
                      <div className="entry">
                        <div className="calc">{priceSummary.title}</div>
                        <div className="result">{priceSummary.result}</div>
                      </div>
                    )}
                    {serviceSummary && (
                      <div className="entry">
                        <div className="calc">{serviceSummary.title}</div>
                        <div className="result">{serviceSummary.result}</div>
                      </div>
                    )}
                    {discountSummary && (
                      <div className="entry">
                        <div className="calc">{discountSummary.title}</div>
                        <div className="result">{discountSummary.result}</div>
                      </div>
                    )}
                  </div>
                  {totalSummary && (
                    <div className="total">
                      <div className="calc">{totalSummary.title}</div>
                      <div className="result">{totalSummary.result}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="terms-and-conditions">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="accept"
                  onClick={tcChecked}
                  ref={tcCheck}
                ></input>
                <label
                  className={classNames(tcError && "tc-error")}
                  for="terms"
                >
                  Agree to terms and conditions
                </label>
              </div>
              <a
                className="booking-modal-button"
                onClick={async () => {
                  nextStep();
                }}
                disabled={isIntentLoading}
              >
                {isIntentLoading ? "Loading" : "Next Step"}
              </a>
            </div>
          </div>
        )}
        {step == 1 && (
          <CheckoutForm
            step={step}
            setStep={setStep}
            data={dataToSend}
          ></CheckoutForm>
        )}
      </div>
    </Modal>
  );
};
