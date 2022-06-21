import moment from "moment";

export const getTotalPrice = (
  rentPriceDay,
  rentPriceWeek,
  rentPriceMonth,
  dateStart,
  dateEnd
) => {
  const start = moment(dateStart);
  const end = moment(dateEnd);
  const dayCount = end.diff(start, "days");

  if (7 <= dayCount && dayCount < 30) {
    return dayCount * rentPriceWeek;
  } else if (dayCount >= 30) {
    return dayCount * rentPriceMonth;
  }
  return dayCount * rentPriceDay;
};

export const getNoDiscountPrice = (rentPriceDay, dateStart, dateEnd) => {
  const start = moment(dateStart);
  const end = moment(dateEnd);
  const dayCount = end.diff(start, "days");
  return dayCount * rentPriceDay;
};

export const getServiceCharge = (totalPrice, serviceCharge) => {
  return totalPrice * serviceCharge;
};
