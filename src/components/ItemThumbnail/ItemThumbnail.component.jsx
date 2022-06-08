import React from "react";
import { useTranslation } from "react-i18next";
import "./itemthumbnail.scss";
import { StarIcon } from "../../assets/Icons";
import { apiUrl } from "../../api/config";
import { ThumbUpIcon } from "../../assets/Icons";
import { Link } from "react-router-dom";
const ItemThumbnail = (item = {}, className = "") => {
  const { t } = useTranslation();
  return (
    <Link to={`/item/${item.item.id}`}>
      <div className="item">
        <img className="item-image" src={apiUrl + `/${item.item.imageURL}`} />
        <div className="item-details">
          <div className="item-details-minor">
            <div>{item.item.username}</div>
            <div className="item-rating">
              {item.item.likes}
              <ThumbUpIcon className="star" />
              <div>({item.item.ratingAmount})</div>
            </div>
            <div>{item.item.location}</div>
          </div>
          <div className="item-details-major">{item.item.title}</div>
          <div className="item-details-price">
            €{item.item.rentPriceDay}/{t("item.price-day")}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ItemThumbnail;
