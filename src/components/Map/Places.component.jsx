import classNames from "classnames";
import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import { googleApiKey, googleLibraries } from "../../api/config";
import { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Dropdown from "../Dropdown/Dropdown.component";
import DropdownItem from "../Dropdown/DropdownItem.component";
import { set } from "lodash";

const autocompleteParameters = {
  requestOptions: { componentRestrictions: { country: "lv" } },
  debounce: 300,
};

const Places = ({
  setPlace = () => {},
  setAddress = () => {},
  onMouseOver = () => {},
  onMouseOut = () => {},
  placeholder = "",
  disabled,
  inputClass,
  inMap = true,
  containerClass,
  children,
  existingValue,
}) => {
  useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });

  useEffect(() => {});
  const {
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

    setAddress(results[0].address_components);
  };
  return (
    <Dropdown
      className={classNames("map-dropdown", inMap && "in-map")}
      value={disabled ? existingValue : value}
      setValue={setValue}
      placeholder={placeholder ? placeholder : "Address"}
      inputClass={inputClass}
      containerClass={containerClass}
      hoverChild={children}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      disabled={disabled}
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
