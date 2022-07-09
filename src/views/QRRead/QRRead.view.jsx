import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { qrCodeScan } from "../../api/booking";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { QrReader } from "react-qr-reader";
import "./qrread.scss";
import { useTranslation } from "react-i18next";
const QRRead = ({ showHeader = (val) => {} }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { booking } = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState();
  const [qrError, setQrError] = useState();
  const [options, setOptions] = useState();
  useEffect(() => {
    debugger;
    if (data) {
      var parsedData = JSON.parse(data);
      if (parsedData.encryptedData) {
        setQrError("");
        parsedData.booking = booking;
        setOptions(parsedData);
      }
    }
  }, [data]);

  useEffect(() => {
    showHeader(false);
    const getScanned = async () => {
      const response = await qrCodeScan(options);
      setLoading(false);
      setStatus(response);
      if (response.status) {
        setTimeout(() => {
          history.goBack();
        }, 2500);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    };
    if (options) {
      setLoading(true);
      getScanned();
    }
  }, [options]);

  return (
    <div className="qr-read container">
      <div className="qr-read-container">
        {!!!options ? (
          <>
            <h2>{t("qr.scan-qr")}</h2>
            <div className="qr-read-overlay">
              <svg width="50px" viewBox="0 0 100 100">
                <path
                  fill="none"
                  d="M13,0 L0,0 L0,13"
                  stroke="rgba(255, 255, 255)"
                  stroke-width="5"
                ></path>
                <path
                  fill="none"
                  d="M0,87 L0,100 L13,100"
                  stroke="rgba(255, 255, 255)"
                  stroke-width="5"
                ></path>
                <path
                  fill="none"
                  d="M87,100 L100,100 L100,87"
                  stroke="rgba(255, 255, 255)"
                  stroke-width="5"
                ></path>
                <path
                  fill="none"
                  d="M100,13 L100,0 87,0"
                  stroke="rgba(255, 255, 255)"
                  stroke-width="5"
                ></path>
              </svg>
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: "100vw" }}
              />
            </div>
            {qrError && <h3>{qrError}</h3>}
          </>
        ) : loading ? (
          <>
            <h1>{t("qr.processing")}</h1>
            <SpinnerAnimationIcon scale={3}></SpinnerAnimationIcon>
          </>
        ) : (
          <>
            <h1 className={status.status ? "" : "error"}>{status.message}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default QRRead;
