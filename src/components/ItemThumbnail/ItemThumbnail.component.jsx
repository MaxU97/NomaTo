import React from "react";
import { useTranslation } from "react-i18next";
import "./itemthumbnail.scss";
import { StarIcon } from "../../assets/Icons";
const ItemThumbnail = (item = {}, className = "") => {
  const { t } = useTranslation();
  console.log(item);
  return (
    <div className="item">
      <img className="item-image" src={item.item.imgUrl} />
      <div className="item-details">
        <div className="item-details-minor">
          <div>{item.item.sellerName}</div>
          <div className="item-rating">
            {item.item.rating}
            <StarIcon className="star" />
            <div>({item.item.ratingAmount})</div>
          </div>
          <div>{item.item.location}</div>
        </div>
        <div className="item-details-major">{item.item.name}</div>
        <div className="item-details-price">
          €{item.item.price}/{t("item.price-day")}
        </div>
      </div>
    </div>
  );
};
export default ItemThumbnail;
