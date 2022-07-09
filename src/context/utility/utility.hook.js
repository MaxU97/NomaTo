import { useEffect } from "react";

const useUtility = ({ state, GET_CAT, GET_SERVICE_CHARGE }) => {
  useEffect(() => {
    if (state.categories == undefined) {
      GET_CAT();
    }
  }, [state.categories]);

  useEffect(() => {
    if (state.serviceCharge <= 0) {
      GET_SERVICE_CHARGE();
    }
  }, [state.serviceCharge]);
  return;
};

export default useUtility;
