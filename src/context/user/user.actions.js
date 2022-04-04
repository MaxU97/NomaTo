import {
  $AUTH,
  $SET_USER,
  $UNAUTH,
  $SET_ORDER_HISTORY,
} from "./user.constants";
import {
  logout,
  login,
  getUser,
  //   getOrderHistory,
  //   updateUser,
} from "../../api/auth";

export const AUTHORIZE = (dispatch) => async (props) => {
  try {
    const token = await login(props);
    dispatch({
      type: $AUTH,
      payload: token,
    });
    return null;
  } catch (err) {
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
