import { $SET_CATEGORIES, $SET_SERVICE_CHARGE } from "./utility.constants";
import { getCategories } from "../../api/utility";
import { getServiceFee } from "../../api/booking";

export const GET_CAT = (dispatch) => async () => {
  try {
    const categories = await getCategories();
    console.log("CATEGORIES:");
    console.log(categories);
    dispatch({
      type: $SET_CATEGORIES,
      payload: categories,
    });
    return null;
  } catch (err) {
    return err;
  }
};

export const GET_SERVICE_CHARGE = (dispatch) => async () => {
  try {
    const serviceCharge = await getServiceFee();
    dispatch({
      type: $SET_SERVICE_CHARGE,
      payload: serviceCharge,
    });
    return null;
  } catch (err) {
    return err;
  }
};
