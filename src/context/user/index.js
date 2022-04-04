import contextFactory from "../contextFactory.tsx";
import { useContext } from "react";
import { UserBaseState, UserReducer } from "./user.reducer";
import userHook from "./user.hook";
import * as actions from "./user.actions";

const userMount = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      ...UserBaseState,
      token,
    };
  }
  return UserBaseState;
};

export const { Provider, Context } = contextFactory({
  reducer: UserReducer,
  actions,
  initialState: UserBaseState,
  useHook: userHook,
  initializer: userMount,
});

export const useUserContext = () => useContext(Context);
