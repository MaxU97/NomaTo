import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { googleApiKey, googleLibraries } from "../../api/config";
import { SpinnerAnimationIcon, SpinnerIcon } from "../../assets/Icons";
import { useUserContext } from "../../context/user";
import { parseAddressSpecific } from "../../services/responsive.service";
import Input from "../Input/Input.component";
import Places from "../Map/Places.component";
import Modal from "../Modal/Modal.component";
import { useNotificationHandler } from "../NotificationHandler/NotificationHandler.component";
import "./addressmodal.scss";
export const AddressModal = ({
  modalOpen = false,
  toggleModal = () => {},
  title = "Edit address",
  setAddress = () => {},
  setLatLng = () => {},
}) => {
  const { t } = useTranslation();
  const { PATCH_ADDRESS } = useUserContext();
  const { notification } = useNotificationHandler();
  const [mainAddress, setMainAddress] = useState("");

  const [houseNumber, setHouseNumber] = useState("");
  const [houseNumberErr, setHouseNumberErr] = useState("");

  const [streetName, setStreetName] = useState("");
  const [streetNameErr, setStreetNameErr] = useState("");

  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState("");

  const [postcode, setPostcode] = useState("");
  const [postcodeErr, setPostcodeErr] = useState("");

  const [country, setCountry] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const addressComponents = mainAddress["address_components"];
    if (addressComponents) {
      setHouseNumber(parseAddressSpecific(addressComponents, "street_number"));
      setStreetName(parseAddressSpecific(addressComponents, "route"));
      setCity(parseAddressSpecific(addressComponents, "locality"));
      setCountry(
        parseAddressSpecific(addressComponents, "country")
          ? parseAddressSpecific(addressComponents, "country")
          : "Latvia"
      );
      setPostcode(
        "LV-" + parseAddressSpecific(addressComponents, "postal_code")
      );
    }
  }, [mainAddress]);

  const submitAddress = async () => {
    const verified = verifyFields();
    if (verified) {
      const props = {
        house_number: houseNumber,
        street_name: streetName,
        city: city,
        country: country,
        postcode: postcode,
      };
      try {
        setIsLoading(true);
        const response = await PATCH_ADDRESS(props);
        setIsLoading(false);
        notification([response.message], !response.changed, 900);
        if (response.changed) {
          toggleModal(false);
        }
      } catch (err) {
        setIsLoading(false);
        notification([err.message], true, 900);
      }
    }
  };
  const verifyFields = () => {
    var verify = true;
    const houseNumberRE = /^([0-9]+[a-z]?)([\/][0-9]+)*$/;
    if (!houseNumberRE.test(houseNumber)) {
      verify = false;
      setHouseNumberErr(t("profile.housenum-error"));
    }

    if (!streetName) {
      verify = false;
      setStreetNameErr(t("profile.street-error"));
    }

    if (!city) {
      setCityErr(t("profile.city-error"));
      verify = false;
    }
    const postcodeRE = /^(LV-)[0-9]{4}$/;
    if (!postcodeRE.test(postcode)) {
      setPostcodeErr(t("profile.postcode-error"));
      verify = false;
    }
    return verify;
  };

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
                setValue={(e) => {
                  setHouseNumber(e);
                  setHouseNumberErr();
                }}
                placeholder={t("profile.house-number")}
                error={!!houseNumberErr}
                errorText={houseNumberErr}
              ></Input>
              <Input
                value={city}
                setValue={(e) => {
                  setCity(e);
                  setCityErr();
                }}
                placeholder={t("profile.city")}
                error={!!cityErr}
                errorText={cityErr}
              ></Input>
              <Input
                value={streetName}
                setValue={(e) => {
                  setStreetName(e);
                  setStreetNameErr();
                }}
                placeholder={t("profile.street-name")}
                error={!!streetNameErr}
                errorText={streetNameErr}
              ></Input>
              <Input
                charLimit={7}
                value={postcode}
                setValue={(e) => {
                  setPostcode(e);
                  setPostcodeErr();
                }}
                placeholder={t("profile.postcode")}
                error={!!postcodeErr}
                errorText={postcodeErr}
              ></Input>
            </div>
            <a
              className="address-modal-button"
              onClick={() => {
                submitAddress();
              }}
              disabled={isLoading}
            >
              {isLoading ? <SpinnerIcon></SpinnerIcon> : t("profile.save")}
            </a>
          </div>
        ) : (
          <SpinnerAnimationIcon scale={2}></SpinnerAnimationIcon>
        )}
      </div>
    </Modal>
  );
};
