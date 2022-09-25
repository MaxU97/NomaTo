import { set } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { withdraw } from "../../api/finance";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import Input from "../../components/Input/Input.component";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { useUserContext } from "../../context/user";
import "./accountbalance.scss";

const AccountBalance = () => {
  const { t } = useTranslation();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const [amount, setAmount] = useState();
  const [amountError, setAmountError] = useState();
  const { state: userState } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const { notification } = useNotificationHandler();
  const requestWithdraw = async () => {
    if (!amount || amount <= 0) {
      setAmountError("Please enter a valid amount");
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await withdraw({ amount: amount });
        setIsLoading(false);
        notification([response.message]);
        window.location.reload();
      } catch (err) {
        setAmountError(err.message);
        setIsLoading(false);
      }
    }
  };
  const checkAndSetAmount = (event) => {
    setAmount(event);
    setAmountError("");
  };

  return (
    <div className="account-balance">
      <div className="container-s">
        <div className="account-balance-content">
          <h1>{t("account-balance.balance")}</h1>
          <div className="account-balance-container">
            <div className="account-balance-container-l">
              <h3>{t("account-balance.available")}</h3>
              <h1>
                {userState.userBalance
                  ? euroLocale.format(userState.userBalance.available / 100)
                  : euroLocale.format(0)}
              </h1>
            </div>
            <div className="account-balance-container-r">
              <h3>{t("account-balance.pending")}</h3>
              <h1>
                {userState.userBalance
                  ? euroLocale.format(userState.userBalance.pending / 100)
                  : euroLocale.format(0)}
              </h1>
            </div>
          </div>
          <div className="account-balance-withdraw">
            <Input
              placeholder={t("account-balance.amount")}
              value={amount}
              setValue={checkAndSetAmount}
              type="number"
              error={!!amountError}
              errorText={amountError}
            ></Input>
            <a
              className="account-balance-button"
              onClick={() => {
                requestWithdraw();
              }}
            >
              {isLoading
                ? t("account-balance.loading")
                : t("account-balance.withdraw")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
