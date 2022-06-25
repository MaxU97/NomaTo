import { useEffect } from "react";
import { setToken } from "../../api/config";

const useUserHook = ({
  state,
  GET_USER,
  GET_PAYMENT_METHODS,
  GET_USER_BALANCE,
}) => {
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

  useEffect(() => {
    if (state.user.sellerCompleted) {
      GET_USER_BALANCE();
    }
  }, [state.user.sellerCompleted]);
  return;
};

export default useUserHook;
