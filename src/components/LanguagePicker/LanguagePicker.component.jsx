import React, { useState, useRef, useEffect } from "react";

import "./language.scss";
import {
  getCurrentLanguage,
  getLanguageList,
  getFullLanguageList,
} from "../../services/language.service";
import { DownIcon } from "../../assets/Icons";

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

    fullLang.forEach((l) => {
      if (l.key == current) {
        currenttImage = l.img;
      }
    });
    return currenttImage;
  };

  const toggleOpen = (open) => {
    if (open == null) {
      setOpen(!isOpen);
    } else if (open != null) {
      setOpen(open);
    } else {
    }
  };

  const selectLanguage = (key) => {
    setOpen(!isOpen);
    localStorage.language = key;
    window.location.reload();
  };
  return (
    <div className="lp-wrapper" ref={ref}>
      <div className={isOpen ? "lp-wrapper-active open" : "lp-wrapper-active"}>
        <div className="lp-header" onClick={() => toggleOpen()}>
          <img src={getImageForLanguage()} />
          <div className="lp-text">{getSelectedLanguage()}</div>
          <DownIcon />
        </div>
      </div>
      {isOpen && (
        <div className="lp-wrapper-dropdown">
          {lang.map((language) => (
            <div
              key={language.key}
              className="lp-item"
              onClick={() => selectLanguage(language.key)}
            >
              <img src={language.img} />
              <div className="lp-text">{language.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
