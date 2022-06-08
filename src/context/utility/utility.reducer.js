import { $SET_CATEGORIES, $SET_SERVICE_CHARGE } from "./utility.constants";

export const UtilityBaseState = {
  categories: [],
  serviceCharge: 0,
};

export const UtilityReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $SET_CATEGORIES: {
      return {
        ...state,
        categories: payload,
      };
    }
    case $SET_SERVICE_CHARGE: {
      return {
        ...state,
        serviceCharge: payload,
      };
    }
    default: {
      return state;
    }
  }
};
