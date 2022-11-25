import React from "react";
import NotFoundIcon from "../../assets/NotFoundIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./notfound.scss";
const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container-xl">
      <div className="not-found">
        <div className="not-found-image">
          <img src={NotFoundIcon} />
        </div>
        <div className="not-found-text">
          <h1>{t("not-found.text")}</h1>
          <Link to="/" className="not-found-home">
            {t("not-found.button")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
