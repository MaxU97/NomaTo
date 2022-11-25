import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { googleApiKey, googleLibraries } from "../../api/config";
import { CloseIcon, MoveIcon } from "../../assets/Icons";
import Input from "../Input/Input.component";
import Places from "../Map/Places.component";

const LocationFilter = ({
  address,
  addressApplied,
  applyLocation = () => {},
  setAddress = () => {},
  km,
  changeKm = () => {},
  changeLatLng = () => {},
}) => {
  const [locationOpen, toggleLocation] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      {address && addressApplied ? (
        <>
          <span className="mobile-filter-item active">
            {t("search-page.location")}
            <div className="mobile-filter-item-chosen">
              <span>{address.formatted_address}</span>
              <CloseIcon
                onClick={() => {
                  applyLocation("", true);
                }}
              ></CloseIcon>
            </div>
          </span>
        </>
      ) : (
        <span
          className="mobile-filter-item"
          onClick={() => {
            toggleLocation(!locationOpen);
          }}
        >
          {t("search-page.location")}
        </span>
      )}
      <CSSTransition
        in={locationOpen}
        timeout={500}
        unmountOnExit
        classNames="sort-filter"
      >
        <div className="sort-filter-container no-gap h100">
          <div
            className="sort-filter-container-header"
            style={{ marginBottom: "20px" }}
          >
            <MoveIcon
              onClick={() => {
                toggleLocation(false);
              }}
            ></MoveIcon>
            <h2>{t("search-page.location")}</h2>
          </div>
          <Places
            inMap={false}
            containerClass="location-modal-content-input"
            setPlace={changeLatLng}
            setAddress={setAddress}
            // disabled={!isLoaded}
          ></Places>
          <Input
            containerClass="location-modal-content-input"
            placeholder={t("search-page.distance")}
            type="numer"
            value={km}
            setValue={changeKm}
          ></Input>

          <a
            className="location-modal-button"
            style={{ textAlign: "center" }}
            onClick={() => {
              applyLocation();
              toggleLocation(false);
            }}
          >
            {t("search-page.apply")}
          </a>
        </div>
      </CSSTransition>
    </>
  );
};

export default LocationFilter;
