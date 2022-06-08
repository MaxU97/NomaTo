import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { websitUrl } from "../../api/config";
import { useUserContext } from "../../context/user";
import "./qrpage.scss";
const QRPage = ({ showHeader = () => {} }) => {
  const { state } = useUserContext();
  let { type, booking } = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    showHeader(false);
    if (type && booking) {
    }
  }, []);
  return (
    <div className="qr-code container">
      <div className="qr-code-container">
        <h1>{t("qr.show-owner")}</h1>
        <QRCode
          value={`{"type":"${type}","booking":"${booking}", "userID":"${state.user.id}"}`}
        ></QRCode>
        <h4>{t("qr.fees")}</h4>
      </div>
    </div>
  );
};
export default QRPage;
