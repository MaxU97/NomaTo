import { useEffect } from "react";
import { setToken } from "../../api/config";

const useUserHook = ({ state, GET_USER, GET_PAYMENT_METHODS }) => {
  useEffect(() => {
    setToken(state.token);
    if (state.token && !state.user) {
      GET_USER();
    }
  }, [state.token, state.user]);

  useEffect(() => {
    if (state.user && !state.paymentMethods) {
      GET_PAYMENT_METHODS();
    }
  }, [state.paymentMethods, state.user]);

  return;
};

export default useUserHook;
