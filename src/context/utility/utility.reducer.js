import {
  $SET_CATEGORIES,
  $SET_SERVICE_CHARGE,
  $ADD_CATEGORY,
  $DELETE_CATEGORY,
} from "./utility.constants";

export const UtilityBaseState = {
  categories: undefined,
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
    case $ADD_CATEGORY: {
      return {
        ...state,
        categories: payload,
      };
    }
    case $DELETE_CATEGORY: {
      return {
        ...state,
        categories: payload,
      };
    }
    default: {
      return state;
    }
  }
};
