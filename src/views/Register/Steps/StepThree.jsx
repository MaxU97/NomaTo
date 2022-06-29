import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { preRegPhone, sendEmailCode } from "../../../api/auth";
import HoverTooltip from "../../../components/HoverTooltip/HoverTooltip.component";
import Input from "../../../components/Input/Input.component";
import validator from "validator";
import PickerDropdown from "../../../components/PickerDropdown/PickerDropdown.component";
import PickerDropwnItem from "../../../components/PickerDropdown/PickerDropdownItem";
import { getLanguageArray } from "../../../services/language.service";
import LanguagePicker from "../../../components/Picker/LanguagePicker";
import { useNotificationHandler } from "../../../components/NotificationHandler/NotificationHandler.component";
const StepThree = ({
  nextStep = () => {},
  email,
  setReturnPhone = () => {},
}) => {
  const { notification } = useNotificationHandler();
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

  const handleLanguageSelect = (event, language) => {
    setSelectedLanguages([...selectedLanguages, language]);
    setLanguageError(false);
  };

  const handleLanguageDelete = (event, language) => {
    event.stopPropagation();
    setSelectedLanguages(selectedLanguages.filter((lng) => lng != language));
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
      notification([err.message]);
    }
  };
  return (
    <div className="register-form-step-3">
      <Input
        placeholder="Phone"
        value={phone}
        setValue={CheckAndSetPhone}
        error={phoneError}
        errorText="Please enter a valid phone number (+371...)"
        type="number"
      ></Input>
      <LanguagePicker
        languages={languages}
        placeholder="Prefered Languages"
        selectedValues={selectedLanguages}
        onDelete={handleLanguageDelete}
        onSelect={handleLanguageSelect}
        error={languageError}
        errorText={"Please select at least one language"}
      />
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
