import {
  $UPLOAD_ITEM,
  $SEARCH_ITEMS,
  $GET_POPULAR,
  $GET_ITEM,
} from "./item.constants";
import { getItem, getPopular, searchItems, uploadItem } from "../../api/item";

export const UPLOAD_ITEM = (dispatch) => async (props) => {
  try {
    const message = await uploadItem(props);
    dispatch({
      type: $UPLOAD_ITEM,
    });
    return message;
  } catch (err) {
    throw err;
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

export const SEARCH_ITEMS = (dispatch) => async (term) => {
  try {
    const data = await searchItems(term);
    dispatch({
      type: $SEARCH_ITEMS,
      payload: data,
    });
    return data;
  } catch (err) {
    return false;
  }
};
