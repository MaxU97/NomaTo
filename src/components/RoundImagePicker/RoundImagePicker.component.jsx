import React, { Children } from "react";
import "./roundimagepicker.scss";
import { CrownIcon, PlusIcon, TrashIcon } from "../../assets/Icons";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../services/responsive.service";
const RoundImagePicker = ({
  onClick = () => {},
  buttonClassName = "",
  image = "",
  children,
}) => {
  const { isMobile } = useWindowDimensions();
  const { t } = useTranslation();

  return image ? (
    <div className={classNames("image-picker-image", buttonClassName)}>
      <img src={image}></img>

      <div
        className={classNames(
          "image-picker-image-overlay",
          isMobile && "active"
        )}
        onClick={onClick}
      >
        {t("image-tools.change-image")}
      </div>
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
export default RoundImagePicker;
