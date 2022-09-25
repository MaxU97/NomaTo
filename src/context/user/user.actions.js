import {
  $AUTH,
  $SET_USER,
  $UNAUTH,
  $GET_BOOKING_HISTORY,
  $SIGNUP,
  $RESET_CLIENT_SECRET,
  $PATCH_USER,
  $PATCH_IMAGE,
  $GET_USER_BALANCE,
  $FAIL_AUTH,
  $GET_CLIENT_SECRET,
} from "./user.constants";
import {
  logout,
  login,
  getUser,
  signUp,
  getBookingHistory,
  patchUser,
  patchImage,
  getUserBalance,
} from "../../api/auth";

import { getClientSecret } from "../../api/booking";

export const AUTHORIZE = (dispatch) => async (props) => {
  try {
    const token = await login(props);
    dispatch({
      type: $AUTH,
      payload: token,
    });
    return null;
  } catch (err) {
    dispatch({
      type: $FAIL_AUTH,
    });
    return err;
  }
};
export const LOGOUT = (dispatch) => async () => {
  await logout();
  dispatch({
    type: $UNAUTH,
  });
};

export const GET_USER = (dispatch) => async () => {
  try {
    const user = await getUser();
    dispatch({
      type: $SET_USER,
      payload: user,
    });
  } catch (err) {
    console.error(err);
    await logout();
  }
};

export const SIGNUP = (dispatch) => async (props) => {
  try {
    const token = await signUp(props);
    dispatch({
      type: $SIGNUP,
      payload: token,
    });
    return true;
  } catch (err) {
    return err;
  }
};

export const PATCH_USER = (dispatch) => async (props) => {
  try {
    const user = await patchUser(props);
    const message = user.message;
    delete user.message;
    dispatch({
      type: $PATCH_USER,
      payload: user,
    });
    return message;
  } catch (err) {
    throw err;
  }
};

export const PATCH_IMAGE = (dispatch) => async (props) => {
  try {
    const data = await patchImage(props);
    dispatch({
      type: $PATCH_IMAGE,
      payload: data.profileImage,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const GET_BOOKING_HISTORY = (dispatch) => async () => {
  try {
    const bookingHistory = await getBookingHistory();
    dispatch({
      type: $GET_BOOKING_HISTORY,
      payload: { bookingHistory, bookingHistoryLoaded: true },
    });
  } catch (err) {
    dispatch({
      type: $GET_BOOKING_HISTORY,
      payload: { bookingHistory: [], bookingHistoryLoaded: false },
    });
  }
};

export const RESET_CLIENT_SECRET = (dispatch) => () => {
  dispatch({
    type: $RESET_CLIENT_SECRET,
  });
};

export const GET_CLIENT_SECRET = (dispatch) => async (data) => {
  const clientSecret = await getClientSecret(data);
  dispatch({
    type: $GET_CLIENT_SECRET,
    payload: { clientSecret },
  });
};

export const GET_USER_BALANCE = (dispatch) => async () => {
  const userBalance = await getUserBalance();
  dispatch({
    type: $GET_USER_BALANCE,
    payload: userBalance,
  });
};
