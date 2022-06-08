import { useEffect } from "react";

const useItemHook = ({ state, GET_ITEMS, GET_POPULAR }) => {
  useEffect(() => {
    if (state.searchTerms && !state.searchedItems) {
      GET_ITEMS();
    }
  }, [state.searchTerms, state.searchedItems]);

  useEffect(() => {
    if (state.popularItems.length <= 0) {
      // GET_POPULAR();
    }
  }, [state.popularItems]);

  return;
};

export default useItemHook;
