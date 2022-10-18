import { useLoadScript } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import React from "react";
import { googleApiKey, googleLibraries } from "../../api/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { apiUrl, websitUrl } from "../../api/config";
import ImageEditorModal from "../../components/ImagePicker/ImageEditorModal.component";
import ImagePicker from "../../components/ImagePicker/ImagePicker.component";
import Input from "../../components/Input/Input.component";
import RoundImagePicker from "../../components/RoundImagePicker/RoundImagePicker.component";
import { useUserContext } from "../../context/user";
import validator from "validator";
import "./profile.scss";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import classNames from "classnames";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import Places from "../../components/Map/Places.component";
import { AddressModal } from "../../components/AddressModal/AddressModal.component";
const Profile = () => {
  const { t } = useTranslation();
  const { state, PATCH_USER, PATCH_IMAGE } = useUserContext();
  const [image, setImage] = useState(apiUrl + "/" + state.user.profileImage);
  const [modal, toggleModal] = useState(false);
  const [isUpdating, toggleIsUpdating] = useState(false);
  const { notification } = useNotificationHandler();
  const [phoneOver, togglePhoneOver] = useState(false);
  const [addressOver, toggleAddressOver] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [changetoPlaces, setChangeToPlaces] = useState(false);
  const [addressModal, toggleAddressModal] = useState(false);

  const [latlng, setLatLng] = useState("");
  const updateImage = (image) => {
    const promise = fetch(image).then((r) => r.blob());

    Promise.all([promise]).then(async (results) => {
      if (results.length > 0) {
        let data = new FormData();
        data.append(
          "image",
          new File([results[0]], Date.now(), {
            type: results[0].type,
          })
        );

        const response = await PATCH_IMAGE(data);
        notification([response.message]);
        setImage(apiUrl + "/" + response.profileImage);
      }
    });
  };

  const validateFields = () => {
    var boolToReturn = true;

    if (!email) {
      boolToReturn = false;
    }
    if (!phone && !phoneError) {
      boolToReturn = false;
    }
    if (!address) {
      boolToReturn = false;
    }

    return boolToReturn;
  };

  const updateProfile = async () => {
    const validate = validateFields();

    if (validate) {
      setSubmitError("");
      const props = {
        name: name,
        surname: surname,
        phone: phone.substring(1),
        address: address,
        latlng: latlng,
      };
      toggleIsUpdating(true);
      var response;
      try {
        response = await PATCH_USER(props);
      } catch (err) {
        notification([err.message], true);
        toggleIsUpdating(false);
        return;
      }

      if (!response.changed) {
        toggleIsUpdating(false);
        notification([response.message], true);
      } else {
        toggleIsUpdating(false);
        notification([response.message]);
        setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    } else {
      setSubmitError(t("profile.submit-error"));
    }
  };

  const [name, setName] = useState(state.user.name);
  const [surname, setSurname] = useState(state.user.surname);
  const [email, setEmail] = useState(state.user.email);
  const [phone, setPhone] = useState("+" + state.user.phone);
  const [address, setAddress] = useState(state.user.address);

  const [phoneError, setPhoneError] = useState("");

  const languages = state.user.languages;

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
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });
  return (
    <>
      <div className="profile">
        <div
          className="container-m"
          style={{ paddingTop: "140px", paddingBottom: "100px" }}
        >
          <div className="profile-content">
            <h1>{t("profile.title")}</h1>
            <div className="profile-image">
              <RoundImagePicker
                onClick={() => {
                  toggleModal(true);
                }}
                image={image}
                buttonClassName="profile-image-container"
              ></RoundImagePicker>
            </div>
            <div className="profile-content-field">
              <Input
                error={submitError && !surname}
                placeholder={t("profile.name")}
                value={name}
                setValue={setName}
              ></Input>
              <Input
                error={submitError && !surname}
                placeholder={t("profile.surname")}
                value={surname}
                setValue={setSurname}
              ></Input>
            </div>
            <div className="profile-content-field">
              <Input
                placeholder={t("profile.email")}
                value={email}
                disabled={true}
              ></Input>
              <Input
                error={(submitError && !phone) || phoneError}
                placeholder={t("profile.phone")}
                value={phone}
                setValue={CheckAndSetPhone}
                disabled={!state.user.allowPhoneEdit}
                onMouseOver={() => {
                  togglePhoneOver(true);
                }}
                onMouseOut={() => {
                  togglePhoneOver(false);
                }}
                errorText={t("profile.valid-number")}
                showInformation={!state.user.allowPhoneEdit && phoneOver}
                informationText={t("profile.phone-info")}
                type="number"
              />
            </div>
            <div className="profile-content-field">
              <Input
                className="profile-content-field-input"
                placeholder={t("profile.languages")}
                value={languages}
                disabled={true}
              ></Input>
              <Input
                placeholder={t("profile.address")}
                value={state.user.address}
                onClick={() => {
                  toggleAddressModal(true);
                }}
                clickable={true}
              ></Input>

              {/* {isLoaded && (
                <Places
                  inMap={false}
                  containerClass="profile-content-field-input"
                  placeholderColor="#000"
                  setPlace={setLatLng}
                  setAddress={setAddress}
                  onMouseOver={() => {
                    toggleAddressOver(true);
                  }}
                  informationText={t("profile.address-info")}
                  onMouseOut={() => {
                    toggleAddressOver(false);
                  }}
                  existingValue={address}
                  placeholder={typeof address == "object" ? "" : address}
                ></Places>
              )} */}
            </div>
            <span className="profile-content-error">{submitError}</span>
            <div className="profile-button-container">
              <Link to="/change-password" className="profile-button">
                {t("profile.change-pw")}
              </Link>
              {state.user.sellerCompleted && (
                <Link to="/payment-details" className="profile-button">
                  {t("profile.update-bank-info")}
                </Link>
              )}
              <a
                onClick={() => updateProfile()}
                className={classNames(
                  "profile-button",
                  isUpdating && "profile-button-update"
                )}
              >
                {isUpdating ? t("profile.updating") : t("profile.save")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <ImageEditorModal
        modalOpen={modal}
        toggleModal={toggleModal}
        setUploadImages={updateImage}
        circleCrop={true}
      ></ImageEditorModal>
      <AddressModal
        modalOpen={addressModal}
        toggleModal={toggleAddressModal}
        setAddress={setAddress}
      ></AddressModal>
    </>
  );
};

export default Profile;
