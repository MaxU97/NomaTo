import { useEffect } from "react";
import { setToken } from "../../api/config";

const useUserHook = ({ state, GET_USER }) => {
  useEffect(() => {
    setToken(state.token);
    if (state.token && !state.user) {
      GET_USER();
    }
  }, [state.token, state.user]);

  return;
};

export default useUserHook;
