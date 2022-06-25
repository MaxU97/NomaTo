import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./becomealender.scss";
import profileInfo from "../../assets/info/profile-info.png";
import listInfo from "../../assets/info/list-item-info.png";
import { useUserContext } from "../../context/user";
import { CheckIcon } from "../../assets/Icons";
import { checkStripeCompletion, requestAccount } from "../../api/auth";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
const BecomeALender = () => {
  const { notification } = useNotificationHandler();
  const { t } = useTranslation();
  const { state: userState, CHECK_STRIPE } = useUserContext();

  useEffect(() => {
    const checkStripe = async () => {
      if (!userState.user.sellerCompleted) {
        try {
          await CHECK_STRIPE();
        } catch (err) {
          notification([err.message], true);
        }
      }
    };
    checkStripe();
  }, []);
  const getRequestAccount = async () => {
    try {
      const url = await requestAccount();
      window.location.href = url;
    } catch (err) {
      notification([err.message], true);
    }
  };
  return (
    <div className="lender-guide">
      <div className="container-l">
        <div className="lender-guide-content">
          <div className="lender-guide-blocks">
            {" "}
            <div className="lender-guide-block">
              {userState.user.completionStatus && (
                <div className="lender-guide-block-complete">
                  <h1>{t("lender-guide.step-complete")}</h1>
                  <CheckIcon></CheckIcon>
                </div>
              )}
              <h1>{t("lender-guide.finish-profile")}</h1>
              <div className="lender-guide-block-content">
                <ol className="lender-guide-list">
                  <li className="lender-guide-list-item">
                    {t("lender-guide.go-to-your")}{" "}
                    <a className="link" href="/profile">
                      {t("lender-guide.profile")}
                    </a>{" "}
                    {t("lender-guide.page")}
                    <img src={profileInfo}></img>
                  </li>
                  <li className="lender-guide-list-item">
                    {t("lender-guide.fill-fields")}
                  </li>
                  <li className="lender-guide-list-item">
                    {t("lender-guide.add-profile-picture")}
                    <p className="small-text">
                      <i>{t("lender-guide.people-like")}</i>
                    </p>
                  </li>
                  <li className="lender-guide-list-item">
                    {t("lender-guide.profile-complete")}
                    <p className="small-text">
                      <i>{t("lender-guide.profile-allows")}</i>
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="lender-guide-block">
              {userState.user.sellerCompleted && (
                <div className="lender-guide-block-complete">
                  <h1>{t("lender-guide.step-complete")}</h1>
                  <CheckIcon></CheckIcon>
                </div>
              )}
              <h1 style={{ marginBottom: 0 }}>
                {t("lender-guide.sign-up-account")}
              </h1>
              <span>{t("lender-guide.payout-account")}</span>
              <div className="lender-guide-block-content">
                <ol>
                  <li> {t("lender-guide.click-button")}</li>
                  <a
                    className="lender-guide-block-button"
                    onClick={() => {
                      getRequestAccount();
                    }}
                  >
                    Create an account
                  </a>
                </ol>
              </div>
            </div>
            <div className="lender-guide-block">
              <h1>{t("lender-guide.ready-to-lend")}</h1>
              <div className="lender-guide-block-content">
                <ol className="lender-guide-list">
                  <li className="lender-guide-list-item">
                    {t("lender-guide.go-to")}{" "}
                    <a className="link" href="/list-an-item">
                      {t("lender-guide.list-an-item")}
                    </a>
                    <img src={listInfo}></img>
                  </li>
                  <li>{t("lender-guide.fill-required")}</li>
                  <li>{t("lender-guide.lending-set")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeALender;
