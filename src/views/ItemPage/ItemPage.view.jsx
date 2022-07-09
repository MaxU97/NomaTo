import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { apiUrl } from "../../api/config";
import { useItemContext } from "../../context/item";

import "./itempage.scss";
import ImageGallery from "../../components/ImageGallery/ImageGallery.component";
import MultiInput from "../../components/MultiInput/MultiInput.component";
import Map from "../../components/Map/Map.component";
import { useTranslation } from "react-i18next";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  PencilIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon,
} from "../../assets/Icons";
import { BookingModal } from "../../components/BookingModal/BookingModal.component";
import { useUserContext } from "../../context/user";
import { deleteItem, toggleItemVisibility } from "../../api/item";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
export const ItemPage = () => {
  const { state: itemState, GET_ITEM } = useItemContext();
  const { state: userState, GET_BOOKING_HISTORY } = useUserContext();
  const { notification } = useNotificationHandler();
  const { t } = useTranslation();
  let { id } = useParams();
  const options = { style: "currency", currency: "EUR" };
  const euroLocale = Intl.NumberFormat("lv-LV", options);
  const [item, setItem] = useState();
  const [booking, toggleBooking] = useState(false);
  const [itemBooked, setItemBooked] = useState(false);
  const [itemOwner, setItemOwner] = useState(false);
  const [original, showOriginal] = useState(false);
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
      try {
        const item = await GET_ITEM(id);
        setItem(item);
      } catch (err) {
        window.location.href = "/";
        //ADDD ITEM NOT FOUND PAGE
      }
    }
    GET_BOOKING_HISTORY();
  }, []);

  useEffect(() => {
    if (item) {
      if (userState.user.id === item.user.id) {
        setItemOwner(true);
      }
    }
  }, [item]);
  useEffect(() => {
    userState.bookingHistory.forEach((entry) => {
      if (entry.itemID._id === id) {
        if (
          ![
            "with_customer",
            "returned",
            "canceled",
            "refused",
            "approved",
          ].includes(entry.status)
        ) {
          setItemBooked(true);
        }
      }
    });
  }, [userState.bookingHistory]);

  const getBookingButton = () => {
    var returnedA;

    if (itemOwner) {
      returnedA = (
        <a className="availablity-button booked">
          {t("item-page.you-are-owner")}
        </a>
      );
      return returnedA;
    }

    if (itemBooked) {
      returnedA = (
        <a className="availablity-button booked">
          {t("item-page.item-booked")}
        </a>
      );
      return returnedA;
    }
    if (userState.user) {
      if (userState.user.completionStatus) {
        returnedA = (
          <a
            className="availablity-button"
            onClick={() => {
              toggleBooking(true);
            }}
          >
            {t("item-page.make-a-booking")}
          </a>
        );
        return returnedA;
      } else {
        returnedA = (
          <a className="availablity-button booked">
            {t("item-page.need-completed-profile")}
          </a>
        );
        return returnedA;
      }
    } else {
      returnedA = (
        <a
          className="availablity-button"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          {t("item-page.make-a-booking")}
        </a>
      );
      return returnedA;
    }
  };

  const removeItem = async () => {
    try {
      const message = await deleteItem({ id: id });
      notification([message]);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      notification([err], true);
    }
  };

  const toggleVisibility = async () => {
    try {
      const message = await toggleItemVisibility({ id: id });
      notification([message]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      notification([err], true);
    }
  };
  return item ? (
    <div className="item-page-background">
      <div className="container-l background">
        <div className="item-page">
          {(itemOwner || userState.admin) && (
            <div className="item-page-settings">
              <div className="item-page-settings-content">
                <Link to={`/edit-item/${id}`}>
                  <PencilIcon></PencilIcon>
                </Link>
                {item.status == "hidden" ? (
                  <EyeClosedIcon onClick={toggleVisibility}></EyeClosedIcon>
                ) : (
                  <EyeOpenIcon onClick={toggleVisibility}></EyeOpenIcon>
                )}
                <TrashIcon
                  className="trash"
                  onClick={() => {
                    removeItem();
                  }}
                ></TrashIcon>
              </div>
            </div>
          )}
          <div className="item-page-left">
            <ImageGallery
              className="item-page-left-gallery"
              images={item.images}
            ></ImageGallery>
            <div className="title-margin">{t("item-page.location")}</div>

            <Map
              className="item-page-left-map"
              searchable={false}
              areaCenter={item.address}
            ></Map>
          </div>
          <div className="item-page-right">
            <div className="item-page-right-field">
              <div className="title-field">
                <div className="title-field-left">
                  <div className="title">{item.title}</div>
                </div>
                <div className="ratio">
                  <a>{item.likes}</a>
                  <ThumbUpIcon className="likes"></ThumbUpIcon>
                  <a>{item.dislikes}</a>
                  <ThumbDownIcon className="dislikes"></ThumbDownIcon>
                </div>
              </div>
            </div>
            <div className="title-margin">{t("item-page.prices")}</div>
            <div className="item-page-right-field center">
              <div className="item-page-right-prices">
                <div className="price">
                  <div className="price-title">
                    {t("item-page.price-daily")}
                  </div>
                  <div className="price-price">
                    {euroLocale.format(item.rentPriceDay)}
                    <a>/{t("item-page.day")}</a>
                  </div>
                </div>
                <div className="price">
                  <div className="price-title">
                    {t("item-page.price-weekly")}
                  </div>
                  <div className="price-price">
                    {euroLocale.format(item.rentPriceWeek)}
                    <a>/{t("item-page.day")}</a>
                  </div>
                </div>
                <div className="price">
                  <div className="price-title">
                    {t("item-page.price-monthly")}
                  </div>
                  <div className="price-price">
                    {euroLocale.format(item.rentPriceMonth)}
                    <a>/{t("item-page.day")}</a>
                  </div>
                </div>
              </div>
            </div>
            {getBookingButton()}

            <div className="item-page-right-field">
              <div className="title-margin">
                {t("item-page.desc")}
                {item["originalDescription"] != item["description"] && (
                  <a
                    className="title-margin-small"
                    onClick={() => {
                      showOriginal(!original);
                    }}
                  >
                    {original
                      ? t("item-page.show-translated")
                      : t("item-page.show-original")}
                  </a>
                )}
              </div>
              <div className="description" key="RU">
                {original ? item["originalDescription"] : item["description"]}
              </div>
            </div>
            <div className="item-page-right-field flex-row">
              <div className="item-page-right-owner">
                <div className="title-minor">{t("item-page.owner")}</div>
                <div className="item-page-right-owner-contents">
                  <img src={apiUrl + "/" + item.user.profileImage}></img>
                  <div className="item-page-right-owner-name">
                    {item.user.name}
                  </div>
                </div>
              </div>
              <div className="item-page-right-review">
                <div className="title-minor">
                  {t("item-page.recent-review")}
                </div>
                <div className="item-page-right-review-contents">
                  <div className="item-page-right-review-text">
                    <div className="item-page-right-review-text-user">
                      <div className="user">
                        <img src={apiUrl + "/" + item.user.profileImage}></img>
                        {item.user.name}
                      </div>
                      <a
                        className="read-more-link"
                        onClick={() => {
                          console.log("clicked");
                        }}
                      >
                        {t("item-page.read-more")}
                      </a>
                    </div>
                    <div className="item-page-right-review-text-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                  </div>
                  <div className="item-page-right-review-title">
                    <ThumbUpIcon></ThumbUpIcon>
                    {t("item-page.recommended")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <h1>{JSON.stringify(item)}</h1> */}
        <BookingModal
          modalOpen={booking}
          toggleModal={toggleBooking}
          itemQty={item.itemQty}
          minRent={item.minRent}
          rentPriceDay={item.rentPriceDay}
          rentPriceWeek={item.rentPriceWeek}
          rentPriceMonth={item.rentPriceMonth}
          euroLocale={euroLocale}
          itemID={id}
          bookedDates={item.bookedDates}
        ></BookingModal>
      </div>
    </div>
  ) : (
    <></>
  );
};
