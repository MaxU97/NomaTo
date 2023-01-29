import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.scss";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import moment from "moment";
import { isAfter, set } from "date-fns";
import { useTranslation } from "react-i18next";
import { enUS, lv, ru } from "date-fns/locale";
import { format } from "date-fns";
import { getCurrentLanguage, titleCase } from "../../services/language.service";
const Calendar = ({
  setDateRange = () => {},
  dateRange,
  className,
  bookedDates,
  minimumSelection,
  calendarErrorShow,
  calendarError,
  setCalendarError,
}) => {
  const locales = { en: enUS, lv: lv, ru: ru };

  const getViableToday = () => {
    var date = set(new Date(Date.now()), {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    if (isAfter(Date.now(), date)) {
      date = new Date();
      console.log("Is after");
    } else {
      date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }
    return date;
  };

  const { t } = useTranslation();

  const today = getViableToday();

  const [dates, setDates] = useState(dateRange ? dateRange : "");

  const getDayCount = (to, from) => {
    const end = moment(to);
    const start = moment(from);
    const dayCount = end.diff(start, "days");
    return dayCount;
  };

  const handleRangeClick = (date) => {
    if (date) {
      if ("from" in date && "to" in date) {
        if (date["from"] && date["to"]) {
          if (date.to - date.from == 0) {
            setDates(date);
            setCalendarError(t("utility.calendar.error.one-day"));
            setDateRange({});
            return;
          }
          if (date.to > dates.to) {
            setCalendarError("");
            setDates({ from: date.to, to: undefined });
            return;
          }
          const valid = checkBookedDates(date);
          if (!valid) {
            setDates(date);
            setCalendarError(t("utility.calendar.error.booked"));
            setDateRange({});
          } else {
            const count = getDayCount(date.to, date.from);
            if (count < minimumSelection) {
              setDates(date);
              setCalendarError(
                t("utility.calendar.error.minimum") + minimumSelection
              );
              setDateRange({});
            } else {
              setCalendarError("");
              setDates(date);
              setDateRange(date);
            }
          }
        } else {
          setDates(date);
        }
      }
    }
  };

  const checkBookedDates = (date) => {
    let returnBool = true;
    bookedDates.every((day) => {
      if (date.from < day && day < date.to) {
        returnBool = false;
        return false;
      } else {
        returnBool = true;
        return true;
      }
    });
    return returnBool;
  };

  const [month, setMonth] = useState(
    dateRange ? dateRange["from"] : Date.now()
  );

  const formatCaption = (month, options) => {
    return (
      <>
        {titleCase(format(month, "LLLL", { locale: options?.locale }))}{" "}
        {format(month, "uuuu", { locale: options?.locale })}
      </>
    );
  };
  return (
    <>
      <div className={classNames("calendar", !!calendarError && "error")}>
        <DayPicker
          disabled={{ before: today }}
          modifiers={{ booked: bookedDates, today: [today] }}
          locale={locales[getCurrentLanguage()]}
          formatters={{ formatCaption }}
          modifiersClassNames={{
            booked: "booked-date",
            today: "today",
          }}
          month={month}
          onMonthChange={setMonth}
          className={"calendar-container"}
          mode="range"
          selected={dates}
          onSelect={handleRangeClick}
        ></DayPicker>
      </div>
      <div className="calendar-error">{calendarError}</div>
    </>
  );
};

export default Calendar;
