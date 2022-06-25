import React from "react";
import { useUserContext } from "../../context/user";
import "./accountbalance.scss";

const AccountBalance = () => {
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const { state: userState } = useUserContext();
  return (
    <div className="account-balance">
      <div className="container-m">
        <div className="account-balance-content">
          <h1>Balance</h1>
          <div className="account-balance-container">
            <div className="account-balance-container-l">
              <h3>Available</h3>
              <h1>{euroLocale.format(userState.userBalance.available)}</h1>
            </div>
            <div className="account-balance-container-r">
              <h3>Pending</h3>
              <h1>{euroLocale.format(userState.userBalance.pending / 100)}</h1>
            </div>
          </div>
          <a className="account-balance-button">Withdraw Money</a>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
