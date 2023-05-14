import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal.component";
import "./bookingmodal.scss";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import Input from "../Input/Input.component";
import Calendar from "../Calendar/Calendar.component";
import "react-calendar/dist/Calendar.css";
import { getCurrentLanguage } from "../../services/language.service";
import _ from "lodash";
import moment from "moment";

import {
  getTotalPrice,
  getNoDiscountPrice,
  getServiceCharge,
  getExtrasPrice,
} from "../../services/price.service";
import { useUtilityContext } from "../../context/utility";
import { getAvailableQuantity } from "../../api/booking";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
import CheckoutForm from "../CheckoutForm/CheckoutForm.component";
import useWindowDimensions from "../../services/responsive.service";
import SlideUpMenu from "../SlideUpMenu/SlideUpMenu.component";
import { CloseIcon, QuestionIconCircle } from "../../assets/Icons";
export const BookingModal = ({
  modalOpen,
  toggleModal,
  title = "Request a booking",
  minRent,
  rentPriceDay,
  rentPriceWeek,
  rentPriceMonth,
  itemID,
  extras,
  euroLocale,
  bookedDates,
}) => {
  const { isMobile } = useWindowDimensions();
  const tcCheck = useRef();

  const { notification } = useNotificationHandler();
  const [qtyOver, toggleQtyOver] = useState(false);
  const [itemQty, setItemQty] = useState("?");

  const { state: utilityState } = useUtilityContext();
  const [dataToSend, setDataToSend] = useState();
  const [isIntentLoading, setIntentLoading] = useState(false);

  const [qtyWant, setQtyWant] = useState("");
  const [comment, setComment] = useState("");
  const [dayCount, setDayCount] = useState(0);
  const [extrasList, setExtrasList] = useState([]);

  const [daySummary, setDaySummary] = useState("");
  const [priceSummary, setPriceSummary] = useState("");
  const [discountSummary, setDiscountSummary] = useState("");
  const [totalSummary, setTotalSummary] = useState("");
  const [serviceSummary, setServiceSummary] = useState("");
  const [extrasSummary, setExtrasSummary] = useState("");
  const [step, setStep] = useState(0);
  const { t } = useTranslation();

  const [fieldsValidated, setFieldsValidated] = useState(false);
  const [dates, setDates] = useState({}); //actual dates
  const [dateRange, setDateRange] = useState({}); //variable dates
  const [qtyError, setQtyError] = useState("");
  const [tcError, setTCError] = useState("");
  const [calendarError, setCalendarError] = useState("");
  const [extrasError, setExtrasError] = useState("");

  const defaultSummary = {
    day: { range: "", total: `0 ${t("booking-modal.day-multiple")}` },
    price: {
      title:
        `0 ${t("booking-modal.item-multiple")} @ ` +
        euroLocale.format(0) +
        ` x 0 ${t("booking-modal.day-multiple")}`,
      result: euroLocale.format(0),
    },
    discount: "",
    extras: "",
    total: {
      title: t("booking-modal.total"),
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
    let extrasText = {};

    day = { range: getDateRange(), total: getDateCount() };
    const totalPrice = getTotalPrice(
      rentPriceDay,
      rentPriceWeek,
      rentPriceMonth,
      dates.start,
      dates.end
    );

    const extrasPrice = getExtrasPrice(extrasList);

    const noDiscountPrice = getNoDiscountPrice(
      rentPriceDay,
      dates.start,
      dates.end
    );
    const serviceCharge = getServiceCharge(
      totalPrice,
      utilityState.serviceCharge,
      extrasPrice
    );

    price = {
      title:
        qtyWant +
        ` ${t("booking-modal.item-multiple")} @ ` +
        euroLocale.format(rentPriceDay) +
        " x " +
        dayString,
      result: euroLocale.format(noDiscountPrice * qtyWant),
    };

    service = {
      title: t("booking-modal.service-charge"),
      result: euroLocale.format(serviceCharge * qtyWant),
    };

    total = {
      title: t("booking-modal.total"),
      result: euroLocale.format(
        (totalPrice + serviceCharge) * qtyWant + extrasPrice
      ),
    };

    if (extrasList.length <= 0) {
      extrasText = defaultSummary.extras;
    } else {
      extrasText = {
        title: t("booking-modal.extras"),
        result: euroLocale.format(extrasPrice),
      };
    }

    if (dayCount < 7) {
      discount = {};
    } else if (7 <= dayCount && dayCount < 30) {
      discount = {
        title: t("booking-modal.seven-discount"),
        result: euroLocale.format((totalPrice - noDiscountPrice) * qtyWant),
      };
    } else if (dayCount >= 30) {
      discount = {
        title: t("booking-modal.thirty-discount"),
        result: euroLocale.format((totalPrice - noDiscountPrice) * qtyWant),
      };
    }

    return { day, price, service, discount, total, extrasText };
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

  useEffect(() => {
    const changeDates = async () => {
      if (!_.isEmpty(dateRange)) {
        try {
          const qty = await getAvailableQuantity({
            dates: dateRange,
            itemID: itemID,
          });
          setItemQty(qty);
        } catch (err) {
          notification([err.message], true);
        }
        let start = moment(dateRange.from);
        let end = moment(dateRange.to);
        setDayCount(end.diff(start, "days"));
        setDates({ start: dateRange.from, end: dateRange.to });
      } else {
        setDates({});
        setDayCount(0);
      }
    };
    changeDates();
  }, [dateRange]);

  const nextStep = async () => {
    const validated = await validateFields();
    if (validated) {
      setIntentLoading(true);
      setTCError("");
      setDataToSend({
        itemID,
        comment: comment,
        dateStart: dates["start"],
        dateEnd: dates["end"],
        qtyWant: qtyWant,
        extrasList,
      });
      setStep(step + 1);

      //defaulting the page
      setComment("");
      setItemQty("?");
      setDates({});
      setDateRange({});
      setDayCount(0);
      setQtyWant("");
      setExtrasList([]);
    }
  };

  const checkAndResetQtyWant = (value) => {
    resetQtyValidation(value);
  };

  useEffect(() => {
    processFields();
  }, [dates, qtyWant, extrasList]);

  const processFields = () => {
    if (
      !qtyError?.length &&
      !calendarError?.length &&
      qtyWant &&
      !_.isEmpty(dates)
    ) {
      const { day, price, service, discount, total, extrasText } =
        producePriceSummary();
      setDaySummary(day);
      setPriceSummary(price);
      setServiceSummary(service);
      setDiscountSummary(discount);
      setTotalSummary(total);
      setExtrasSummary(extrasText);
    } else {
      setDaySummary(defaultSummary.day);
      setPriceSummary(defaultSummary.price);
      setDiscountSummary(defaultSummary.discount);
      setServiceSummary(defaultSummary.service);
      setTotalSummary(defaultSummary.total);
      setExtrasSummary(defaultSummary.extras);
    }
  };

  const validateFields = async () => {
    let returnBool = true;
    if (qtyWant > 0) {
      if (qtyWant > itemQty) {
        setQtyError(
          `${t("booking-modal.only")} ${itemQty} ${t(
            "booking-modal.available"
          )}`
        );
        returnBool = false;
      }
    } else {
      setQtyError(t("booking-modal.select-quantity"));
      returnBool = false;
    }
    if (_.isEmpty(dates)) {
      if (!calendarError) {
        setCalendarError(t("booking-modal.valid-dates"));
        returnBool = false;
      }
    }

    if (!tcCheck.current.checked) {
      returnBool = false;
      setTCError(true);
    }

    if (extras && extrasList.length <= 0) {
      const allExtras = document.extras;

      for (let i = 0; i < allExtras.length; i++) {
        let val = allExtras[i];
        if (val.name == "clearchecklist" && val.checked === false) {
          returnBool = false;
          setExtrasError(t("booking-modal.extras-error"));
          return false;
        }
      }
    }
    return returnBool;
  };

  const resetQtyValidation = (value) => {
    if (value) {
      if (value > itemQty) {
        setQtyError(
          `${t("booking-modal.only")} ${itemQty} ${t(
            "booking-modal.available"
          )}`
        );
        // setQtyWant(itemQty);
        // return;
      } else {
        setQtyError("");
        // setQtyWant(value);
      }
    } else {
      setQtyError("");
      // setQtyWant(value);
    }
    setQtyWant(value);
  };
  const resetTCValidation = () => {
    if (tcCheck.current.checked) {
      setTCError(false);
    } else {
      setTCError(true);
    }
  };

  const tcChecked = () => {
    resetTCValidation();
  };

  const handleExtras = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const allExtras = document.extras;
    if (value == -1) {
      setExtrasList([]);
      for (let i = 0; i < allExtras.length; i++) {
        if (allExtras[i].name == "checklist") {
          allExtras[i].checked = false;
        }
      }
    } else {
      for (let i = 0; i < allExtras.length; i++) {
        if (allExtras[i].name == "clearchecklist") {
          allExtras[i].checked = false;
        }
      }
      if (isChecked) {
        setExtrasList([...extrasList, extras[value]]);
      } else {
        const filteredList = extrasList.filter(
          (item) => !_.isEqual(item, extras[value])
        );
        setExtrasList([...filteredList]);
      }
    }
    setExtrasError("");
  };

  const children = (
    <div>
      {step == 0 && (
        <div className="booking-modal-contents">
          <div className="booking-modal-contents-left">
            <Calendar
              calendarError={calendarError}
              setCalendarError={setCalendarError}
              dateRange={dateRange}
              setDateRange={setDateRange}
              bookedDates={bookedDates.map((date) => new Date(date))}
              minimumSelection={minRent}
            ></Calendar>

            <div className="booking-modal-contents-left-top">
              <Input
                placeholder={t("booking-modal.quantity")}
                error={!!qtyError}
                errorText={qtyError}
                className={classNames("booking-modal-input")}
                value={qtyWant}
                setValue={checkAndResetQtyWant}
                disabled={_.isEmpty(dateRange)}
                onMouseOver={() => {
                  toggleQtyOver(true);
                }}
                onMouseOut={() => {
                  toggleQtyOver(false);
                }}
                showInformation={_.isEmpty(dates) && qtyOver}
                informationText={t("booking-modal.dates-first")}
                type="number"
                maxLength={10}
                containerClass={classNames(qtyError && "error")}
              ></Input>
              <div className="quantity-available" disabled={_.isEmpty(dates)}>
                {itemQty} {t("booking-modal.available-c")}
              </div>
            </div>
            <Input
              placeholder={t("booking-modal.comment")}
              className={classNames("booking-modal-input-100")}
              value={comment}
              setValue={setComment}
              maxLength={200}
            ></Input>
          </div>
          <div className="booking-modal-contents-right">
            {extras && extras.length && (
              <div
                className={classNames("extras", _.isEmpty(dates) && "disabled")}
              >
                <h3>{t("booking-modal.extras")}</h3>
                <form
                  className={classNames(
                    "extras-content",
                    (_.isEmpty(dates) || !qtyWant) && "disabled",
                    extrasError && "error"
                  )}
                  name="extras"
                >
                  {extras.map((value, index) => {
                    return (
                      <div key={value.id} className="extras-content-item">
                        <input
                          type="checkbox"
                          name="checklist"
                          disabled={_.isEmpty(dates) || !qtyWant}
                          value={index}
                          onChange={handleExtras}
                        ></input>
                        <label>{`${value.title} (+ ${euroLocale.format(
                          value.price
                        )})`}</label>
                        {value.description && (
                          <div className="extras-content-tooltip-container">
                            <div className="extras-content-tooltip">
                              <QuestionIconCircle></QuestionIconCircle>
                            </div>
                            <div className="extras-content-tooltip-content">
                              <span>{value.description}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div key={-1} className="extras-content-item">
                    <input
                      type="checkbox"
                      name="clearchecklist"
                      disabled={_.isEmpty(dates) || !qtyWant}
                      value={-1}
                      onChange={handleExtras}
                    ></input>
                    <label>{t("booking-modal.no-extras")}</label>
                  </div>
                </form>
                <div
                  className={classNames(
                    "extras-info",
                    extrasError && "extras-error"
                  )}
                >
                  {extrasError
                    ? extrasError
                    : t("booking-modal.select-dates-qty")}
                </div>
              </div>
            )}

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
                      <span className="calc">{priceSummary.title}</span>
                      <span className="result">{priceSummary.result}</span>
                    </div>
                  )}
                  {extrasSummary && (
                    <div className="entry">
                      <span className="calc">{extrasSummary.title}</span>
                      <span className="result">{extrasSummary.result}</span>
                    </div>
                  )}
                  {serviceSummary && (
                    <div className="entry">
                      <span className="calc">{serviceSummary.title}</span>
                      <span className="result">{serviceSummary.result}</span>
                    </div>
                  )}
                  {discountSummary && (
                    <div className="entry">
                      <span className="calc">{discountSummary.title}</span>
                      <span className="result">{discountSummary.result}</span>
                    </div>
                  )}
                </div>
                {totalSummary && (
                  <div className="total">
                    <span className="calc">{totalSummary.title}</span>
                    <span className="result">{totalSummary.result}</span>
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
              <label className={classNames(tcError && "tc-error")} for="terms">
                {t("booking-modal.t-c")}
              </label>
            </div>
            <a
              className="booking-modal-button"
              onClick={async () => {
                nextStep();
              }}
            >
              {t("booking-modal.next")}
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
  );

  return isMobile ? (
    <SlideUpMenu
      toggleMenu={toggleModal}
      menuOpen={modalOpen}
      draggable={false}
    >
      <div className="mobile-booking-title">
        <h1>{title}</h1>
        <CloseIcon
          onClick={() => {
            toggleModal(false);
          }}
        ></CloseIcon>
      </div>

      {children}
    </SlideUpMenu>
  ) : (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="booking-modal">
        <h1>{title}</h1>
        {children}
      </div>
    </Modal>
  );
};
