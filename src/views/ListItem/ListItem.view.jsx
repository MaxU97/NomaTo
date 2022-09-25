import { t } from "i18next";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "./listitem.scss";
import Input from "../../components/Input/Input.component";
import { Link, useLocation } from "react-router-dom";
import CategoryModal from "../../components/CategoryModal/CategoryModal.component";
import Map from "../../components/Map/Map.component";
import TextArea from "../../components/TextArea/TextArea.component";
import MultiInput from "../../components/MultiInput/MultiInput.component";
import MultiImagePicker from "../../components/ImagePicker/MultiImagePicker.component";
import { getCurrentLanguage } from "../../services/language.service";
import ImageEditorModal from "../../components/ImagePicker/ImageEditorModal.component";
import classNames from "classnames";
import { useItemContext } from "../../context/item";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { useUserContext } from "../../context/user";
import useWindowDimensions from "../../services/responsive.service";
import Places from "../../components/Map/Places.component";

const ListItem = () => {
  const location = useLocation();
  const { isMobile } = useWindowDimensions();
  const [isUploading, setIsUploading] = useState(false);

  const { notification } = useNotificationHandler();
  const { state: items, UPLOAD_ITEM } = useItemContext();
  const { state: userState } = useUserContext();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");

  const [description, setDescription] = useState("");

  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState();
  const [rentPriceDay, setRentPriceDay] = useState("");
  const [rentPriceWeek, setRentPriceWeek] = useState("");
  const [rentPriceMonth, setRentPriceMonth] = useState("");

  const [itemValue, setItemValue] = useState("");

  const [minRent, setMinRent] = useState("");

  const [itemQty, setItemQty] = useState(1);

  const [uploadImages, setUploadImages] = useState([]);

  const [imageUploadModal, toggleImageUpload] = useState(false);
  const [categoryModal, toggleCategories] = useState(false);

  const [pageLoaded, setPageLoaded] = useState(false);

  const [validationError, setValidationError] = useState([]);

  const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;
  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (userState.user.completionStatus && userState.user.sellerCompleted) {
        toggleCategories(true);
      }
    }, 0);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    if (subCategory) {
      setCategoryText(
        category[titleLanguage] + " >>> " + subCategory[titleLanguage]
      );
    } else {
      setCategoryText(category[titleLanguage]);
    }
  }, [category, subCategory]);

  useEffect(() => {
    if (pageLoaded) {
      validate();
    }
  }, [
    uploadImages,
    title,
    description,
    address,
    rentPriceDay,
    rentPriceWeek,
    rentPriceMonth,
    itemValue,
    minRent,
    itemQty,
  ]);

  const validate = () => {
    var error = [];
    let updateErrors = {};
    if (uploadImages.length <= 0) {
      error.push(t("list-item.error.image"));
      updateErrors = { ...updateErrors, imageError: true };
    }
    if (!title) {
      error.push(t("list-item.error.title"));
      updateErrors = { ...updateErrors, titleError: true };
    }
    if (!description) {
      error.push(t("list-item.error.desc"));
      updateErrors = { ...updateErrors, descError: true };
    }
    if (!address) {
      error.push(t("list-item.error.address"));
      updateErrors = { ...updateErrors, addressError: true };
    }
    if (!rentPriceDay) {
      error.push(t("list-item.error.rent-day"));
      updateErrors = { ...updateErrors, rentDayError: true };
    }
    if (!rentPriceWeek) {
      error.push(t("list-item.error.rent-week"));
      updateErrors = { ...updateErrors, rentWeekError: true };
    }
    if (!rentPriceMonth) {
      error.push(t("list-item.error.rent-month"));
      updateErrors = { ...updateErrors, rentMonthError: true };
    }
    if (!itemValue) {
      error.push(t("list-item.error.value"));
      updateErrors = { ...updateErrors, itemValueError: true };
    }
    if (!minRent) {
      error.push(t("list-item.error.min-rent"));
      updateErrors = { ...updateErrors, minRentError: true };
    }
    if (!itemQty) {
      error.push(t("list-item.error.qty"));
      updateErrors = { ...updateErrors, itemQtyError: true };
    }
    setErrors(updateErrors);
    setValidationError(error);
    return !!error;
  };
  const uploadItem = () => {
    if (validate()) {
      let data = new FormData();
      let promises = [];

      uploadImages.forEach((blob) => {
        promises.push(fetch(blob).then((r) => r.blob()));
      });
      Promise.all(promises).then(async (results) => {
        results.forEach((image) => {
          data.append(
            "images",
            new File([image], Date.now(), { type: image.type })
          );
        });
        data.append("title", title);
        data.append("category", category["_id"]);
        if (subCategory) {
          data.append("subcat", subCategory["_id"]);
        }
        data.append("description", description);
        data.append("addressLng", addressLatLng["lng"]);
        data.append("addressLat", addressLatLng["lat"]);
        data.append("itemValue", itemValue);
        data.append("minRent", minRent);
        data.append("itemQty", itemQty);
        data.append("rentPriceDay", rentPriceDay);
        data.append("rentPriceWeek", rentPriceWeek);
        data.append("rentPriceMonth", rentPriceMonth);

        data.append(
          "addressNatural",
          JSON.stringify(address.address_components)
        );
        var response;
        try {
          setIsUploading(true);
          response = await UPLOAD_ITEM(data);

          notification([response]);
          setIsUploading(false);
          window.location.href = "/";
        } catch (err) {
          notification([err], true);
          setIsUploading(false);
        }
      });
    }
  };

  return (
    <div className="add-listing">
      {userState.user.completionStatus && userState.user.sellerCompleted ? (
        category ? (
          <div
            className="container-m"
            style={{ paddingTop: "140px", paddingBottom: "100px" }}
          >
            <div className="listing-form">
              <h1>{t("list-item.title")}</h1>
              <MultiImagePicker
                className={classNames(
                  "listing-form-field",
                  errors["imageError"] && "error"
                )}
                toggleModal={toggleImageUpload}
                imageList={uploadImages}
                setImages={setUploadImages}
              ></MultiImagePicker>
              <Input
                placeholder={t("list-item.set-title")}
                className={classNames("listing-form-field")}
                value={title}
                setValue={setTitle}
                error={!!errors["titleError"]}
              ></Input>
              <Input
                placeholder={t("list-item.category")}
                value={categoryText}
                style={{ cursor: "pointer" }}
                setValue={setCategoryText}
                className="listing-form-field"
                onFocus={(event) => {
                  toggleCategories(true);
                  event.target.blur();
                }}
              ></Input>
              <TextArea
                placeholder={t("list-item.desc")}
                value={description}
                setValue={setDescription}
                className={classNames("listing-form-field-text")}
                containerClassName={classNames(errors["descError"] && "error")}
              ></TextArea>
              {isMobile ? (
                <Places
                  inMap={false}
                  containerClass="listing-form-field"
                  setPlace={setAddressLatLng}
                  setAddress={setAddress}
                  error={errors["addressError"]}
                  withoutError={true}
                ></Places>
              ) : (
                <Map
                  className={classNames(
                    "listing-form-field listing-form-field-map",
                    errors["addressError"] && "error"
                  )}
                  setAddress={setAddress}
                  setAddressLatLng={setAddressLatLng}
                ></Map>
              )}

              <div className="note listing-form-field">
                {t("list-item.address-disclaimer")}
              </div>

              <div className="listing-form-multi">
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.item-value")}
                  value={itemValue}
                  setValue={setItemValue}
                  error={!!errors["itemValueError"]}
                  type="number"
                ></Input>
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.min-days")}
                  value={minRent}
                  setValue={setMinRent}
                  error={!!errors["minRentError"]}
                  type="number"
                ></Input>
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.qty")}
                  value={itemQty}
                  setValue={setItemQty}
                  error={!!errors["itemQtyError"]}
                  type="number"
                ></Input>
              </div>

              <h4 className="rent-price">{t("list-item.price-per")}</h4>

              <div className="listing-form-multi">
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.day")}
                  value={rentPriceDay}
                  setValue={setRentPriceDay}
                  error={!!errors["rentDayError"]}
                  type="number"
                ></Input>
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.week")}
                  value={rentPriceWeek}
                  setValue={setRentPriceWeek}
                  error={!!errors["rentWeekError"]}
                  type="number"
                ></Input>
                <Input
                  className={classNames("price-short")}
                  placeholder={t("list-item.month")}
                  value={rentPriceMonth}
                  setValue={setRentPriceMonth}
                  error={!!errors["rentMonthError"]}
                  type="number"
                ></Input>
              </div>
              {!!validationError?.length && (
                <>
                  <h2 className="error-title">Must include the following:</h2>
                  <div className="error-message">
                    {validationError.map((error, index) => {
                      return <div className="error-message-point">{error}</div>;
                    })}
                  </div>
                </>
              )}
              <div className="listing-form-buttons">
                <Link className="listing-button gray" to="/">
                  {t("list-item.cancel")}
                </Link>
                <a
                  className={classNames(
                    "listing-button",
                    isUploading && "disabled"
                  )}
                  onClick={() => {
                    uploadItem();
                    setPageLoaded(true);
                  }}
                >
                  {isUploading
                    ? t("list-item.uploading") + "..."
                    : t("list-item.list-item")}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-cat">
            <a
              className="no-cat-button"
              onClick={() => {
                toggleCategories(true);
              }}
            >
              {t("list-item.choose-cat")}
            </a>
          </div>
        )
      ) : (
        <div className="no-cat">
          <h1>
            {t("list-item.fill-profile")}{" "}
            <Link to="/profile">{t("list-item.fill-profile2")}</Link>{" "}
            {t("list-item.fill-profile3")}{" "}
            <Link
              to={{
                pathname: "/payment-details",
                state: { from: location.pathname },
              }}
            >
              {t("list-item.fill-profile4")}
            </Link>{" "}
            {t("list-item.fill-profile5")}
          </h1>
        </div>
      )}

      <CategoryModal
        modalOpen={categoryModal}
        toggleModal={toggleCategories}
        style={{ backgroundColor: "none" }}
        title="Select a category"
        setCategory={setCategory}
        setSubCategory={setSubCategory}
      />
      <ImageEditorModal
        modalOpen={imageUploadModal}
        toggleModal={toggleImageUpload}
        setUploadImages={setUploadImages}
        uploadImages={uploadImages}
      ></ImageEditorModal>
    </div>
  );
};

export default ListItem;
