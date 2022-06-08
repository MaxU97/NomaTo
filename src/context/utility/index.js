import contextFactory from "../contextFactory.tsx";
import { useContext } from "react";
import { UtilityBaseState, UtilityReducer } from "./utility.reducer";
import useUtility from "./utility.hook";
import * as actions from "./utility.actions";

export const { Provider, Context } = contextFactory({
  reducer: UtilityReducer,
  actions,
  initialState: UtilityBaseState,
  useHook: useUtility,
});

export const useUtilityContext = () => useContext(Context);
