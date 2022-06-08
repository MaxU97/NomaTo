import {
  $UPLOAD_ITEM,
  $GET_ITEMS,
  $GET_ITEM,
  $GET_POPULAR,
} from "./item.constants";

export const ItemBaseState = {
  cachedItems: [],
  searchedItems: [],
  popularItems: [],
  searchTerms: {},
};

export const ItemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $UPLOAD_ITEM: {
      return state;
    }

    case $GET_ITEMS: {
      return { ...state, searchedItems: payload };
    }

    case $GET_ITEM: {
      return { ...state, cachedItems: [payload, ...state.cachedItems] };
    }
    case $GET_POPULAR: {
      return { ...state, popularItems: payload };
    }
  }
};
