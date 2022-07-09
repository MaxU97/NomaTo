import React, { Children } from "react";
import "./imagepicker.scss";
import { CrownIcon, PlusIcon, TrashIcon } from "../../assets/Icons";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
const ImagePicker = ({
  onClick = () => {},
  buttonClassName = "",
  image = "",
  index = 0,
  imageList = [],
  setImages = () => {},
  showLegend = true,
  children,
}) => {
  const { t } = useTranslation();
  const removeImage = () => {
    var newList = [...imageList];
    newList.splice(index, 1);
    setImages(newList);
  };
  const makeMain = () => {
    var newList = [...imageList];
    var newMain = newList.splice(index, 1);
    newList = [newMain, ...newList];
    setImages(newList);
  };
  return image ? (
    <div className={classNames("image-picker-image", buttonClassName)}>
      {index == 0 && showLegend && (
        <div className="main-image-text">{t("image-tools.main-image")}</div>
      )}
      <div className="image-picker-image-controls">
        {index != 0 && (
          <div className="image-picker-image-icon">
            <div className="image-picker-image-controls-tooltip">
              <div className="image-picker-image-controls-tooltip-content">
                {t("image-tools.main-tooltip")}
              </div>
              <div className="arrow-down"></div>
            </div>
            <CrownIcon onClick={makeMain} className="crown"></CrownIcon>
          </div>
        )}

        <div className="image-picker-image-icon ">
          <div className="image-picker-image-controls-tooltip">
            <div className="image-picker-image-controls-tooltip-content">
              {t("image-tools.delete-tooltip")}
            </div>
            <div className="arrow-down"></div>
          </div>
          <TrashIcon onClick={removeImage} className="delete"></TrashIcon>
        </div>
      </div>
      <img src={image}></img>
    </div>
  ) : (
    <div
      onClick={onClick}
      className={classNames("image-picker-button", buttonClassName)}
    >
      <div className="image-picker-button-text">
        {t("image-tools.add-image")}
      </div>
      <PlusIcon />
      {children}
    </div>
  );
};
export default ImagePicker;
