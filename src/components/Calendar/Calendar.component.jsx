import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.scss";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import moment from "moment";
const Calendar = ({
  setDateRange = () => {},
  dateRange,
  className,
  bookedDates,
  minimumSelection,
  calendarError,
  setCalendarError,
}) => {
  const today = new Date();
  const [dates, setDates] = useState();

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
            setCalendarError("Please select more than one day");
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
            setCalendarError("Your selection contains booked dates");
            setDateRange({});
          } else {
            const count = getDayCount(date.to, date.from);
            if (count < minimumSelection) {
              setDates(date);
              setCalendarError(
                "The minimum rent duration for this item is: " +
                  minimumSelection
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

  return (
    <div className={classNames("calendar", calendarError && "error")}>
      <CSSTransition
        in={calendarError}
        timeout={500}
        unmountOnExit
        classNames="error-container"
      >
        <div className="hover-error">
          <div className="hover-error-content l">
            {calendarError}
            <div class="arrow-right"></div>
          </div>
        </div>
      </CSSTransition>
      <DayPicker
        disabled={{ before: today }}
        modifiers={{ booked: bookedDates }}
        modifiersClassNames={{ booked: "booked-date" }}
        className={"calendar-container"}
        mode="range"
        selected={dates}
        onSelect={handleRangeClick}
      ></DayPicker>
    </div>
  );
};

export default Calendar;
