import {
  $UPLOAD_ITEM,
  $GET_ITEMS,
  $GET_POPULAR,
  $GET_ITEM,
} from "./item.constants";
import { getItem, getPopular, uploadItem } from "../../api/item";

export const UPLOAD_ITEM = (dispatch) => async (props) => {
  try {
    await uploadItem(props);
    dispatch({
      type: $UPLOAD_ITEM,
    });
    return "Item Listed!";
  } catch (err) {
    return err;
  }
};

export const GET_POPULAR = (dispatch) => async () => {
  try {
    const popularItems = await getPopular();
    dispatch({
      type: $GET_POPULAR,
      payload: popularItems.data["items"],
    });
    return null;
  } catch (err) {
    return err;
  }
};

export const GET_ITEM = (dispatch) => async (id) => {
  try {
    const data = await getItem(id);
    dispatch({
      type: $GET_ITEM,
      payload: data,
    });
    return data;
  } catch (err) {
    return false;
  }
};
