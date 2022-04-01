import i18n from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";
import resources from "../locales/resources.loc";
import LV from "../assets/fl-lv.png";
import RU from "../assets/fl-ru.png";
import EN from "../assets/fl-en.png";

var languages = [
  {
    key: "lv",
    title: "LV",
    img: LV,
  },
  {
    key: "en",
    title: "EN",
    img: EN,
  },
  {
    key: "ru",
    title: "RU",
    img: RU,
  },
];

const setLanguage = () => {
  const saved = localStorage.getItem("language");
  if (saved) {
    return saved;
  }

  localStorage.setItem("language", "lv");
  return "lv";
};
export const getFullLanguageList = () => {
  return languages;
};

export const getLanguageList = () => {
  var currentLanguage = localStorage.getItem("language");
  var first;
  languages.forEach((language) => {
    if (language.key === currentLanguage) {
      first = language;
    }
  });

  languages.sort(function (x, y) {
    return x == first ? -1 : y == first ? 1 : 0;
  });

  var returnLang = Array.from(languages);
  returnLang.shift();
  return returnLang;
};

export const getCurrentLanguage = () => {
  return localStorage.getItem("language");
};

i18n.use(initReactI18next).init(
  {
    resources,
    lng: localStorage.getItem("language") || "lv",
    fallbackLng: "lv",
    whitelist: ["en", "lv", "ru"],
  },
  async () => {
    i18n.changeLanguage(setLanguage());
  }
);

// catch the event and make changes accordingly
i18n.on("languageChanged", async (lng) => {
  // E.g. set the moment locale with the current language
  moment.locale(lng);
});

export default i18n;
