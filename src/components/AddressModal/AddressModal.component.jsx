import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { googleApiKey, googleLibraries } from "../../api/config";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { parseAddressSpecific } from "../../services/responsive.service";
import Input from "../Input/Input.component";
import Places from "../Map/Places.component";
import Modal from "../Modal/Modal.component";
import "./addressmodal.scss";
export const AddressModal = ({
  modalOpen = false,
  toggleModal = () => {},
  title = "Edit address",
  setAddress = () => {},
  setLatLng = () => {},
}) => {
  const { t } = useTranslation();
  const [mainAddress, setMainAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });
  useEffect(() => {
    debugger;
    const addressComponents = mainAddress["address_components"];
    if (addressComponents) {
      setHouseNumber(parseAddressSpecific(addressComponents, "street_number"));
      setStreetName(parseAddressSpecific(addressComponents, "route"));
      setCity(parseAddressSpecific(addressComponents, "locality"));
      setCountry(parseAddressSpecific(addressComponents, "country"));
      setPostcode(parseAddressSpecific(addressComponents, "postal_code"));
    }
  }, [mainAddress]);
  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="address-modal">
        <h1>{title}</h1>
        {isLoaded ? (
          <div className="address-modal-container">
            <Places
              inMap={false}
              containerClass="address-modal-field-input"
              setPlace={setLatLng}
              setAddress={setMainAddress}
              informationText={t("profile.address-info")}
              placeholder={t("profile.type-an-address")}
            ></Places>
            <div className="address-modal-fields">
              <Input
                value={houseNumber}
                setValue={setHouseNumber}
                placeholder={t("profile.house-number")}
                type="number"
              ></Input>
              <Input
                value={streetName}
                setValue={setStreetName}
                placeholder={t("profile.street-name")}
              ></Input>
              <Input
                value={city}
                setValue={setCity}
                placeholder={t("profile.city")}
              ></Input>
              <Input
                value={postcode}
                setValue={setPostcode}
                placeholder={t("profile.postcode")}
              ></Input>
            </div>
            <a className="address-modal-button">{t("profile.save")}</a>
          </div>
        ) : (
          <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
        )}
      </div>
    </Modal>
  );
};
