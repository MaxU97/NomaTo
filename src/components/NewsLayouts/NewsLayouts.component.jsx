import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { NewsTemplates } from "../../services/nomato.constants";
import "./newslayouts.scss";
const NewsLayouts = ({ layout, setLayout = () => {} }) => {
  const { t } = useTranslation();
  return (
    <div className="news-layouts">
      <div className="news-layouts-placeholder">{t("add-news.layout")}</div>
      <div className="news-layouts-container">
        {Object.keys(NewsTemplates).map((key, index) => {
          const obj = NewsTemplates[key];
          return (
            <div
              className={classNames(
                "news-layouts-template",
                layout === obj && "active"
              )}
              key={obj.value}
              onClick={() => {
                layout !== obj && setLayout(obj);
              }}
            >
              <div className="news-layouts-template-img">
                <i
                  className={
                    "news-template-icon news-template-icon-" + obj.value
                  }
                ></i>
              </div>
              <div className="news-layouts-template-label">{t(obj.label)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsLayouts;
