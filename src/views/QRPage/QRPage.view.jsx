import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { websitUrl } from "../../api/config";
import { getQRHash } from "../../api/utility";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { useUserContext } from "../../context/user";
import "./qrpage.scss";
const QRPage = ({ showHeader = (val) => {} }) => {
  let { type, booking } = useParams();
  const [hash, setHash] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { notification } = useNotificationHandler();
  const { t } = useTranslation();
  useEffect(() => {
    const getHash = async () => {
      showHeader(false);
      if (type && booking) {
        try {
          const hash = await getQRHash({ type, booking });
          setHash(JSON.stringify(hash));
          setIsLoading(false);
        } catch (err) {
          notification([err.message], true);
        }
      }
    };
    getHash();
  }, []);
  return (
    <div className="qr-code container">
      <div className="qr-code-container">
        {isLoading ? (
          <SpinnerAnimationIcon></SpinnerAnimationIcon>
        ) : (
          <>
            <h1>{t("qr.show-owner")}</h1>
            <QRCode value={`${hash}`}></QRCode>
            <h4>{t("qr.fees")}</h4>
          </>
        )}
      </div>
    </div>
  );
};
export default QRPage;
