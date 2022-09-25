import {
  $ADD_CATEGORY,
  $SET_CATEGORIES,
  $SET_SERVICE_CHARGE,
  $DELETE_CATEGORY,
} from "./utility.constants";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../api/utility";
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

export const ADD_CATEGORY = (dispatch) => async (data) => {
  try {
    const categories = await createCategory(data);
    dispatch({
      type: $ADD_CATEGORY,
      payload: categories,
    });
    return true;
  } catch (err) {
    throw err;
  }
};

export const DELETE_CATEGORY = (dispatch) => async (id) => {
  try {
    const categories = await deleteCategory(id);

    dispatch({
      type: $DELETE_CATEGORY,
      payload: categories,
    });
    return true;
  } catch (err) {
    throw err;
  }
};
