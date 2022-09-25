import React from "react";
import { useTranslation } from "react-i18next";
import "./itemthumbnail.scss";
import { StarIcon } from "../../assets/Icons";
import { apiUrl } from "../../api/config";
import { ThumbUpIcon } from "../../assets/Icons";
import { Link } from "react-router-dom";
import classNames from "classnames";
const ItemThumbnail = ({ className, item }) => {
  const { t } = useTranslation();
  return (
    <Link to={`/item/${item.id}`}>
      <div className={classNames("item", className)}>
        <img className="item-image" src={apiUrl + `/${item.imageURL}`} />
        <div className="item-details">
          <div className="item-details-minor">
            <div className="item-details-name">{item.username}</div>
            <div className="item-rating">
              {item.likes}
              <ThumbUpIcon className="star" />
              <div>({item.ratingAmount})</div>
            </div>
            <div>{item.location}</div>
          </div>
          <div className="item-details-major">{item.title}</div>
          <div className="item-details-price">
            €{item.rentPriceDay}/{t("item.price-day")}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ItemThumbnail;
