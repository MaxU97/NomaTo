import { useEffect } from "react";
import { setToken } from "../../api/config";

const useUserHook = ({ state, GET_USER, GET_USER_BALANCE }) => {
  useEffect(() => {
    setToken(state.token);
    if (state.token && !state.user) {
      GET_USER();
    }
  }, [state.token, state.user]);

  useEffect(() => {
    if (state.user) {
      GET_USER_BALANCE();
    }
  }, [state.user]);
  return;
};

export default useUserHook;
