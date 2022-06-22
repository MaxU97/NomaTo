import { t, use } from "i18next";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "./edititem.scss";
import Input from "../../components/Input/Input.component";
import { useParams, Link } from "react-router-dom";
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
import { apiUrl } from "../../api/config";
import {
  getNaturalAddress,
  getNaturalAddressFull,
} from "../../services/item.service";

const EditItem = () => {
  const [isUploading, setIsUploading] = useState(false);

  const { id } = useParams();
  const { notification } = useNotificationHandler();
  const { state: items, UPLOAD_ITEM } = useItemContext();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");

  const [descEN, setDescEN] = useState("");
  const [descLV, setDescLV] = useState("");
  const [descRU, setDescRU] = useState("");

  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState();
  const [rentPriceDay, setRentPriceDay] = useState("");
  const [rentPriceWeek, setRentPriceWeek] = useState("");
  const [rentPriceMonth, setRentPriceMonth] = useState("");

  const [naturalAddress, setNaturalAddress] = useState();
  const [itemValue, setItemValue] = useState("");

  const [minRent, setMinRent] = useState("");

  const [itemQty, setItemQty] = useState(1);

  const [uploadImages, setUploadImages] = useState([]);

  const [imageUploadModal, toggleImageUpload] = useState(false);
  const [categoryModal, toggleCategories] = useState(false);

  const [pageLoaded, setPageLoaded] = useState(false);

  const [validationError, setValidationError] = useState([]);

  const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;

  const [item, setItem] = useState();
  const { state: itemState, GET_ITEM } = useItemContext();
  useEffect(async () => {
    let itemSet = false;
    itemState.cachedItems.forEach((item) => {
      if (id == item._id) {
        setItem(item);
        itemSet = true;
        return;
      }
    });
    if (!itemSet) {
      const item = await GET_ITEM(id);
      setItem(item);
    }
  }, []);

  useEffect(() => {
    const settingItem = async () => {
      if (item) {
        setCategory(item.category);
        setTitle(item.title);
        setDescEN(item.descEN);
        setDescRU(item.descRU);
        setDescLV(item.descLV);
        setItemValue(item.itemValue);
        setMinRent(item.minRent);
        setItemQty(item.itemQty);
        setRentPriceDay(item.rentPriceDay);
        setRentPriceWeek(item.rentPriceDay);
        setRentPriceMonth(item.rentPriceMonth);
        setUploadImages(item.images.map((image) => apiUrl + "/" + image));
        setNaturalAddress(
          await getNaturalAddressFull(item.address.lat, item.address.lng)
        );
        setAddress(item.address);
      }
    };
    settingItem();
  }, [item]);

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
    descEN,
    descLV,
    descRU,
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
      error.push("At least 1 image, ");
      updateErrors = { ...updateErrors, imageError: true };
    }
    if (!title) {
      error.push("A title, ");
      updateErrors = { ...updateErrors, titleError: true };
    }
    if (!descEN & !descLV & !descRU) {
      error.push("At least 1 description, ");
      updateErrors = { ...updateErrors, descError: true };
    }
    if (!address) {
      error.push("A valid address from the dropdown, ");
      updateErrors = { ...updateErrors, addressError: true };
    }
    if (!rentPriceDay) {
      error.push("A rent price per day, ");
      updateErrors = { ...updateErrors, rentDayError: true };
    }
    if (!rentPriceWeek) {
      error.push("A rent price per week, ");
      updateErrors = { ...updateErrors, rentWeekError: true };
    }
    if (!rentPriceMonth) {
      error.push("A rent price per month, ");
      updateErrors = { ...updateErrors, rentMonthError: true };
    }
    if (!itemValue) {
      error.push("Item Value,  ");
      updateErrors = { ...updateErrors, itemValueError: true };
    }
    if (!minRent) {
      error.push("Minimal rent duration ");
      updateErrors = { ...updateErrors, minRentError: true };
    }
    if (!itemQty) {
      error.push("Quantity of items ");
      updateErrors = { ...updateErrors, itemQtyError: true };
    }
    setErrors(updateErrors);
    setValidationError(error);
    return !!validationError;
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
        data.append("descEN", descEN);
        data.append("descLV", descLV);
        data.append("descRU", descRU);
        data.append("addressLng", addressLatLng["lng"]);
        data.append("addressLat", addressLatLng["lat"]);
        data.append("itemValue", itemValue);
        data.append("minRent", minRent);
        data.append("itemQty", itemQty);
        data.append("rentPriceDay", rentPriceDay);
        data.append("rentPriceWeek", rentPriceWeek);
        data.append("rentPriceMonth", rentPriceMonth);
        data.append("addressNatural", JSON.stringify(address));
        var response;
        try {
          setIsUploading(true);
          response = await UPLOAD_ITEM(data);

          notification([response]);
          setIsUploading(false);
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        } catch (err) {
          notification([err], true);
          setIsUploading(false);
        }
      });
    }
  };

  return (
    <div className="add-listing">
      {category && (
        <div className="container-m">
          <div className="listing-form">
            <h1>{t("edit-item.title")}</h1>
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
              containerClass={classNames(errors["titleError"] && "error")}
              tooltipMessage="Good title example: Sony Camera 64GB"
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
            <MultiInput
              className={classNames(errors["descError"] && "error")}
              languages={["RU", "LV", "EN"]}
            >
              <TextArea
                placeholder={t("list-item.desc")}
                value={descRU}
                setValue={setDescRU}
                className={classNames("listing-form-field-text")}
                key="RU"
                containerClassName={classNames(
                  "no-left-corner",
                  errors["descError"] && "error"
                )}
              ></TextArea>
              <TextArea
                placeholder={t("list-item.desc")}
                value={descLV}
                setValue={setDescLV}
                className={classNames("listing-form-field-text")}
                key="LV"
                containerClassName={classNames(
                  "no-left-corner",
                  errors["descError"] && "error"
                )}
              ></TextArea>
              <TextArea
                placeholder={t("list-item.desc")}
                value={descEN}
                setValue={setDescEN}
                key="EN"
                className={classNames("listing-form-field-text")}
                containerClassName={classNames(
                  "no-left-corner",
                  errors["descError"] && "error"
                )}
              ></TextArea>
            </MultiInput>
            <div className="note listing-form-field">
              {t("list-item.description-disclaimer")}
            </div>

            <Map
              className={classNames(
                "listing-form-field listing-form-field-map",
                errors["addressError"] && "error"
              )}
              existingAddress={naturalAddress}
              existingAddressCoordinates={address}
              setAddress={setAddress}
              setAddressLatLng={setAddressLatLng}
            ></Map>
            <div className="note listing-form-field">
              {t("list-item.address-disclaimer")}
            </div>

            <div className="listing-form-multi">
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["itemValueError"] && "error")}
                placeholder={t("list-item.item-value")}
                value={itemValue}
                setValue={setItemValue}
                type="number"
              ></Input>
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["minRentError"] && "error")}
                placeholder={t("list-item.min-days")}
                value={minRent}
                setValue={setMinRent}
                type="number"
              ></Input>
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["itemQtyError"] && "error")}
                placeholder={t("list-item.qty")}
                value={itemQty}
                setValue={setItemQty}
                type="number"
              ></Input>
            </div>

            <h4 className="rent-price">{t("list-item.price-per")}</h4>

            <div className="listing-form-multi">
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["rentDayError"] && "error")}
                placeholder={t("list-item.day")}
                value={rentPriceDay}
                setValue={setRentPriceDay}
                type="number"
              ></Input>
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["rentWeekError"] && "error")}
                placeholder={t("list-item.week")}
                value={rentPriceWeek}
                setValue={setRentPriceWeek}
                type="number"
              ></Input>
              <Input
                className={classNames("price-short")}
                containerClass={classNames(errors["rentMonthError"] && "error")}
                placeholder={t("list-item.month")}
                value={rentPriceMonth}
                setValue={setRentPriceMonth}
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
          {JSON.stringify(item)}
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

export default EditItem;
