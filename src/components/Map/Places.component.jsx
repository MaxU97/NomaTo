import classNames from "classnames";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Dropdown from "../Dropdown/Dropdown.component";
import DropdownItem from "../Dropdown/DropdownItem.component";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForceUpdate } from "../../services/responsive.service";

const autocompleteParameters = {
  requestOptions: { componentRestrictions: { country: "lv" } },
  debounce: 300,
  // initOnMount: false,
};

const Places = ({
  setPlace = () => {},
  setAddress = () => {},
  onMouseOver = () => {},
  onMouseOut = () => {},
  placeholderColor,
  placeholder = "",
  disabled,
  inputClass,
  inMap = true,
  containerClass,
  children,
  existingValue,
  error,
  errorText,
  informationText,
  showInformation,
  withoutError = false,
}) => {
  const { t } = useTranslation();
  var {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete(autocompleteParameters);

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng });
    setAddress(results[0]);
  };

  return (
    <Dropdown
      className={classNames("map-dropdown", inMap && "in-map")}
      value={disabled ? existingValue : value}
      setValue={setValue}
      placeholder={placeholder ? placeholder : t("utility.places.address")}
      inputClass={inputClass}
      containerClass={containerClass}
      placeholderColor={placeholderColor}
      hoverChild={children}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      disabled={disabled || !ready}
      error={error}
      errorText={errorText}
      showInformation={showInformation}
      informationText={informationText}
      withoutError={withoutError}
    >
      {status === "OK" &&
        data.map(({ place_id, description }) => {
          return (
            <DropdownItem
              key={place_id}
              value={description}
              onSelect={handleSelect}
            ></DropdownItem>
          );
        })}
    </Dropdown>
  );
};

export default Places;
