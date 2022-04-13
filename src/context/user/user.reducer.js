import {
  $AUTH,
  $FAIL_AUTH,
  $SET_ORDER_HISTORY,
  $SET_USER,
  $UNAUTH,
  $SIGNUP,
} from "./user.constants";

export const UserBaseState = {
  user: false,
  token: false,
  orderHistory: [],
  orderHistoryLoading: true,
};

export const UserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $AUTH: {
      return {
        ...state,
        token: payload,
      };
    }
    case $UNAUTH: {
      return UserBaseState;
    }
    case $SIGNUP: {
      return {
        ...state,
        token: payload,
      };
    }
    case $FAIL_AUTH: {
      return state;
    }
    case $SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case $SET_ORDER_HISTORY: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
};
