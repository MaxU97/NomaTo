import classNames from "classnames";
import React, { useState } from "react";
import "./multiinput.scss";
import { getCurrentLanguage } from "../../services/language.serivce";
const MultiInput = ({ children, languages, className }) => {
  const language = getCurrentLanguage().toUpperCase();
  const [current, setCurrent] = useState(language);

  return (
    <div className="lang-desc">
      <div className="lang-desc-chooser">
        {languages.map((lang, index) => {
          return (
            <a
              key={index}
              className={classNames(
                "lang-desc-chooser-item",
                className,
                current == lang && "active"
              )}
              onClick={() => {
                setCurrent(lang);
              }}
            >
              {lang}
            </a>
          );
        })}
      </div>
      {children.map((child) => {
        if (child.key == current) {
          return child;
        }
      })}
    </div>
  );
};

export default MultiInput;
