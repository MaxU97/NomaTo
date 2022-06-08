import contextFactory from "../contextFactory.tsx";
import { useContext } from "react";
import { ItemBaseState, ItemReducer } from "./item.reducer";
import useItemHook from "./item.hook";
import * as actions from "./item.actions";

export const { Provider, Context } = contextFactory({
  reducer: ItemReducer,
  actions,
  useHook: useItemHook,
  initialState: ItemBaseState,
});

export const useItemContext = () => useContext(Context);
