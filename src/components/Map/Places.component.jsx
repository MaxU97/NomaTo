import { setDefaultNamespace } from "i18next";
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Dropdown from "../Dropdown/Dropdown.component";
import DropdownItem from "../Dropdown/DropdownItem.component";

const autocompleteParameters = {
  requestOptions: { componentRestrictions: { country: "lv" } },
  debounce: 300,
};

const Places = ({ setPlace = () => {} }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete(autocompleteParameters);
  console.log(status, data);

  const handleSelect = async (val) => {
    debugger;
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng });
  };
  return (
    <Dropdown
      className="map-dropdown"
      value={value}
      setValue={setValue}
      placeholder="Address"
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
{
  /* <Combobox onSelect={() => {}}>
<ComboboxInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Search address"
></ComboboxInput>
<ComboboxPopover>
  <ComboboxList>
    
  </ComboboxList>
</ComboboxPopover>
</Combobox> */
}
