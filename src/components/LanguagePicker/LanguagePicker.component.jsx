import React, { useState, useRef, useEffect } from "react";

import "./language.scss";
import {
  getCurrentLanguage,
  getLanguageList,
  getFullLanguageList,
} from "../../services/language.serivce";
import downIcon from "../../assets/down-icon.svg";
import i18n from "../../services/language.serivce";
import { click } from "@testing-library/user-event/dist/click";

const LanguagePicker = () => {
  const lang = getLanguageList();
  const fullLang = getFullLanguageList();

  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const clickOutside = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    } else {
      toggleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  const getSelectedLanguage = () => {
    const current = getCurrentLanguage();
    var currentTitle;
    fullLang.forEach((l) => {
      if (l.key == current) {
        currentTitle = l.title;
      }
    });
    return currentTitle;
  };

  const getImageForLanguage = () => {
    const current = getCurrentLanguage();
    var currenttImage;
    debugger;
    fullLang.forEach((l) => {
      if (l.key == current) {
        currenttImage = l.img;
      }
    });
    return currenttImage;
  };

  const toggleOpen = (open) => {
    debugger;
    if (open == null) {
      setOpen(!isOpen);
    } else if (open != null) {
      setOpen(open);
    } else {
    }
  };

  const selectLanguage = (key) => {
    setOpen(!isOpen);
    i18n.changeLanguage(key);
    localStorage.language = key;
  };
  return (
    <div className="lp-wrapper" ref={ref}>
      <div className={isOpen ? "lp-wrapper-active open" : "lp-wrapper-active"}>
        <div className="lp-item" onClick={() => toggleOpen()}>
          <img src={getImageForLanguage()} />
          <div className="lp-text">{getSelectedLanguage()}</div>
          <img src={downIcon}></img>
        </div>
      </div>
      <div className="lp-wrapper-dropdown">
        {isOpen &&
          lang.map((language) => (
            <div
              className="lp-item"
              onClick={() => selectLanguage(language.key)}
            >
              <img src={language.img} />
              <div className="lp-text">{language.title}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LanguagePicker;
