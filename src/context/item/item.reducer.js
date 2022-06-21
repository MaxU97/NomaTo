import {
  $UPLOAD_ITEM,
  $SEARCH_ITEMS,
  $GET_ITEM,
  $GET_POPULAR,
} from "./item.constants";

export const ItemBaseState = {
  cachedItems: [],
  searchedItems: [],
  popularItems: [],
  searchItemCount: 0,
  searchCity: "",
};

export const ItemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case $UPLOAD_ITEM: {
      return state;
    }

    case $SEARCH_ITEMS: {
      return {
        ...state,
        searchedItems: payload.searchItems,
        searchItemCount: payload.searchItemCount,
      };
    }

    case $GET_ITEM: {
      return { ...state, cachedItems: [payload, ...state.cachedItems] };
    }
    case $GET_POPULAR: {
      return { ...state, popularItems: payload };
    }
  }
};
