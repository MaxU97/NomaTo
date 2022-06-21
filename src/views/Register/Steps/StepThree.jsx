import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { preRegPhone, sendEmailCode } from "../../../api/auth";
import HoverTooltip from "../../../components/HoverTooltip/HoverTooltip.component";
import Input from "../../../components/Input/Input.component";
import validator from "validator";
import PickerDropdown from "../../../components/PickerDropdown/PickerDropdown.component";
import PickerDropwnItem from "../../../components/PickerDropdown/PickerDropdownItem";
import { getLanguageArray } from "../../../services/language.serivce";
const StepThree = ({
  nextStep = () => {},
  email,
  setReturnPhone = () => {},
}) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [languages, setLanguages] = useState(getLanguageArray());
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageError, setLanguageError] = useState(false);
  const CheckAndSetPhone = (event) => {
    setPhone(event);
    const validate = validator.isMobilePhone(event, "lv-LV", {
      strictMode: false,
    });

    if (validate) {
      setPhoneError(!validate);
    } else {
      setPhoneError(!validate);
    }
  };

  const handleLanguageSelect = (language) => {
    const indexToDelete = languages.indexOf(language);
    const newArray = languages;
    newArray.splice(indexToDelete, 1);
    setLanguages(newArray);
    setSelectedLanguages([...selectedLanguages, language]);
    setLanguageError(false);
  };

  const handleLanguageDelete = (event, language) => {
    event.stopPropagation();
    const indexToDelete = selectedLanguages.indexOf(language);
    const newArray = selectedLanguages;
    newArray.splice(indexToDelete, 1);
    setSelectedLanguages(newArray);
    setLanguages([...languages, language]);
  };

  const validateFields = () => {
    var boolToReturn = true;

    if (selectedLanguages.length <= 0) {
      boolToReturn = boolToReturn && false;
      setLanguageError(true);
    }

    if (phoneError || !phone) {
      boolToReturn = boolToReturn && false;
      setPhoneError(true);
    }
    return boolToReturn;
  };
  const sendForm = async () => {
    const validate = validateFields();
    try {
      if (validate) {
        const props = { email: email, phone: phone, languages: languages };
        const phoneToReturn = await preRegPhone(props);
        setReturnPhone(phoneToReturn);
        nextStep();
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="register-form-step-3">
      <Input
        placeholder="Phone"
        value={phone}
        setValue={CheckAndSetPhone}
        containerClass={phoneError && "register-error"}
        type="number"
        className="register-form-field"
      >
        <HoverTooltip
          content={phoneError && "Please enter a valid phone number (+371...)"}
          inVar={phoneError}
          style={{ transform: "translateY(25%)" }}
        ></HoverTooltip>
      </Input>
      <PickerDropdown
        className="register-form-field"
        placeholder="Preferred Languages"
        selectedValues={selectedLanguages}
        onDelete={handleLanguageDelete}
        containerClassname={languageError && "register-error"}
        hoverError={
          <HoverTooltip
            content={languageError && "Please select at least one language"}
            style={{ transform: "translateY(25%)" }}
            inVar={languageError}
          ></HoverTooltip>
        }
      >
        {languages.map((lang) => {
          return (
            <PickerDropwnItem
              key={lang}
              value={lang}
              onSelect={handleLanguageSelect}
            ></PickerDropwnItem>
          );
        })}
      </PickerDropdown>
      <a
        onClick={() => {
          sendForm();
        }}
        className="register-form-field-button"
      >
        Next Step
      </a>
    </div>
  );
};
export default StepThree;
