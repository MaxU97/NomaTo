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
import { useUserContext } from "../../context/user";
import { patchItem } from "../../api/item";
import { PlusIcon, SpinnerAnimationIcon, TrashIcon } from "../../assets/Icons";

const EditItem = () => {
  const { state: userState } = useUserContext();

  const [isUploading, setIsUploading] = useState(false);

  const { id } = useParams();
  const { notification } = useNotificationHandler();
  const { UPLOAD_ITEM } = useItemContext();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");

  const [description, setDescription] = useState("");

  const [extras, setExtras] = useState([{}]);

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

  const [imagesChanged, setImagesChanged] = useState(false);

  const [item, setItem] = useState();
  const { state: itemState, GET_ITEM } = useItemContext();
  useEffect(async () => {
    let itemSet = false;
    itemState.cachedItems.forEach((item) => {
      if (id == item._id) {
        setItem(item);

        if (item.extras.length) {
          setExtras(item.extras);
        }
        itemSet = true;
        return;
      }
    });
    if (!itemSet) {
      const item = await GET_ITEM(id);

      setItem(item);
      if (item.extras.length) {
        setExtras(item.extras);
      }
    }
  }, []);

  useEffect(() => {
    const settingItem = async () => {
      if (item) {
        if (!(item.user.id == userState.user.id) && !userState.user.admin) {
          window.location.href = "/";
        }
        setCategory(item.category);
        setTitle(item.title);
        setDescription(item.originalDescription);
        setItemValue(item.itemValue);
        setMinRent(item.minRent);
        setItemQty(item.itemQty);
        setRentPriceDay(item.rentPriceDay);
        setRentPriceWeek(item.rentPriceDay);
        setRentPriceMonth(item.rentPriceMonth);
        setUploadImages(item.images.map((image) => apiUrl + "/" + image));
        setAddress(
          await getNaturalAddressFull(item.address.lat, item.address.lng)
        );
        setAddressLatLng(item.address);
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

    if (checkExtrasForErrors()) {
      error.push(t("list-item.extras-error"));
    }
    setErrors(updateErrors);
    setValidationError(error);

    return !error?.length;
  };
  const uploadItem = () => {
    if (validate()) {
      let data = new FormData();
      let promises = [];

      uploadImages.forEach((blob) => {
        promises.push(fetch(blob).then((r) => r.blob()));
      });
      Promise.all(promises).then(async (results) => {
        if (imagesChanged) {
          results.forEach((image) => {
            data.append(
              "images",
              new File([image], Date.now(), { type: image.type })
            );
          });
        }
        data.append("itemId", id);
        data.append("title", title);

        data.append(
          "category",
          category["_id"] ? category["_id"] : category["id"]
        );
        if (subCategory) {
          data.append(
            "subcat",
            subCategory["_id"] ? subCategory["_id"] : subCategory["id"]
          );
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
        data.append("extras", JSON.stringify(extras));
        data.append(
          "addressNatural",
          JSON.stringify(address.address_components)
        );
        var response;
        try {
          setIsUploading(true);
          response = await patchItem(data);

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

  const changeExtrasTitle = (index, title) => {
    var newExtrasArray = extras;
    newExtrasArray[index].title = title;
    setExtras([...newExtrasArray]);
  };

  const changeExtrasPrice = (index, price) => {
    var newExtrasArray = extras;
    newExtrasArray[index].price = price;
    setExtras([...newExtrasArray]);
  };

  const changeExtrasDescritption = (index, desc) => {
    var newExtrasArray = extras;
    newExtrasArray[index].description = desc;
    setExtras([...newExtrasArray]);
  };

  const addExtra = () => {
    var newExtrasArray = [...extras, {}];
    if (newExtrasArray.length > 5) {
      notification([t("list-item.only-5-extras")], true);
      return;
    } else {
      setExtras(newExtrasArray);
      setTimeout(() => {
        document
          .getElementById(`extra-${newExtrasArray.length - 1}`)
          .scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
      }, 50);
    }
  };

  const removeExtra = (index) => {
    var newExtrasArray = extras;
    newExtrasArray.splice(index, 1);
    if (newExtrasArray.length == 0) {
      setExtras([{}]);
    } else {
      setExtras([...newExtrasArray]);
    }
    setTimeout(() => {
      document
        .getElementById(`extra-${newExtrasArray.length - 1}`)
        .scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
    }, 50);
  };

  const checkExtrasForErrors = () => {
    var errored = false;
    var newExtrasArray = extras.map((extra) => {
      if (extra.title && !extra.price) {
        extra.error = "price";
        errored = true;
      } else if (extra.price && !extra.title) {
        extra.error = "title";
        errored = true;
      }
      return extra;
    });
    setExtras(newExtrasArray);
    return errored;
  };

  return (
    <div className="add-listing">
      <div
        className="container-m"
        style={{ paddingTop: "140px", paddingBottom: "100px" }}
      >
        {category ? (
          <div className="listing-form">
            <h1>{t("edit-item.title")}</h1>
            <MultiImagePicker
              className={classNames(
                "listing-form-field",
                errors["imageError"] && "error"
              )}
              toggleModal={toggleImageUpload}
              imageList={uploadImages}
              setImages={(event) => {
                setUploadImages(event);
                setImagesChanged(true);
              }}
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
            <TextArea
              placeholder={t("list-item.desc")}
              value={description}
              setValue={setDescription}
              className={classNames("listing-form-field-text")}
              containerClassName={classNames(errors["descError"] && "error")}
            ></TextArea>
            <div className="note listing-form-field">
              {t("list-item.description-disclaimer")}
            </div>

            <Map
              className={classNames(
                "listing-form-field listing-form-field-map",
                errors["addressError"] && "error"
              )}
              existingAddress={address.formatted_address}
              existingAddressCoordinates={addressLatLng}
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

            <h4 className="sub-title">{t("list-item.extras")}</h4>
            <div className="listing-form-extras">
              {extras.map((extra, index) => {
                return (
                  <div
                    className="listing-form-extras-container"
                    id={`extra-${index}`}
                  >
                    <div className="listing-form-extras-controls">
                      <PlusIcon
                        className="listing-form-extras-controls-add"
                        onClick={addExtra}
                      ></PlusIcon>
                      <TrashIcon
                        className="listing-form-extras-controls-remove"
                        onClick={() => {
                          removeExtra(index);
                        }}
                      ></TrashIcon>
                    </div>
                    <div className="listing-form-extras-top">
                      <Input
                        charLimit={15}
                        placeholder={t("list-item.set-title")}
                        setValue={(event) => {
                          changeExtrasTitle(index, event);
                        }}
                        error={extra.error == "title"}
                        value={extra.title ? extra.title : ""}
                      ></Input>
                      <Input
                        placeholder={t("list-item.price")}
                        type="number"
                        setValue={(event) => {
                          changeExtrasPrice(index, event);
                        }}
                        error={extra.error == "price"}
                        value={extra.price ? extra.price : ""}
                      ></Input>
                    </div>
                    <Input
                      placeholder={t("list-item.extras-description")}
                      value={extra.description ? extra.description : ""}
                      setValue={(event) => {
                        changeExtrasDescritption(index, event);
                      }}
                    ></Input>
                  </div>
                );
              })}
            </div>

            {!!validationError?.length && (
              <>
                <h2 className="error-title">{t("list-item.must-include")}:</h2>
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
                  ? t("edit-item.uploading") + "..."
                  : t("edit-item.edit-item")}
              </a>
            </div>
          </div>
        ) : (
          <div className="add-listing-spinner">
            <SpinnerAnimationIcon scale={5}></SpinnerAnimationIcon>
          </div>
        )}
      </div>

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
        setUploadImages={(event) => {
          setUploadImages(event);
          setImagesChanged(true);
        }}
        uploadImages={uploadImages}
      ></ImageEditorModal>
    </div>
  );
};

export default EditItem;
