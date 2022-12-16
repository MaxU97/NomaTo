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
  QuestionIconCircle,
  SpinnerAnimationIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon,
} from "../../assets/Icons";
import { BookingModal } from "../../components/BookingModal/BookingModal.component";
import { useUserContext } from "../../context/user";
import { deleteItem, toggleItemVisibility } from "../../api/item";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import useWindowDimensions from "../../services/responsive.service";
import classNames from "classnames";
import { usePromptHandler } from "../../components/Prompt/Prompt.component";
import Reviews from "../../components/Reviews/Reviews.component";
import Modal from "../../components/Modal/Modal.component";
import LeaveReviewForm from "../../components/LeaveReview/LeaveReviewForm.component,";
import BaseSkeleton from "../../skeletons/BaseSkeleton/BaseSkeleton.component";
import ItemPageGallerySkeleton from "../../skeletons/ItemPageSkeleton/ItemPageGallerySkeleton.component";
import { ItemPageMapSkeleton } from "../../skeletons/ItemPageSkeleton/ItemPageMapSkeleton.component";
import { BaseSkeletonShimmer } from "../../skeletons/BaseSkeleton/BaseSkeletonShimmer.component";
import SkeletonWrapper from "../../skeletons/SkeletonWrapper";
import ItemPageDescriptionSkeleton from "../../skeletons/ItemPageSkeleton/ItemPageDescriptionSkeleton.component";
import ItemPageOwnerSkeleton from "../../skeletons/ItemPageSkeleton/ItemPageOwnerSkeleton.component";
import ItemPageReviewSkeleton from "../../skeletons/ItemPageSkeleton/ItemPageReviewSkeleton.component";

const scrollToRef = (ref) => {
  window.scrollTo({ top: ref.current.offsetTop, left: 0, behavior: "smooth" });
};

export const ItemPage = () => {
  const { isMobile } = useWindowDimensions();
  const { state: itemState, GET_ITEM } = useItemContext();
  const {
    state: userState,
    GET_BOOKING_HISTORY,
    CHECK_REVIEWS,
  } = useUserContext();
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
  const [showReviews, toggleReviews] = useState(false);

  const [reviewModal, toggleReviewModal] = useState(false);
  const { prompt } = usePromptHandler();

  const reviewsRef = useRef(null);
  const executeScroll = () => {
    scrollToRef(reviewsRef);
  };

  useEffect(async () => {
    let itemSet = false;
    itemState.cachedItems.forEach((item) => {
      if (id == item._id) {
        setItem(item);
        itemSet = true;
        return;
      }
    });
    GET_BOOKING_HISTORY();
    if (!itemSet) {
      try {
        const item = await GET_ITEM(id);
        setItem(item);
      } catch (err) {
        window.location.href = "/";
        //ADDD ITEM NOT FOUND PAGE
      }
    }
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
            onClick={async () => {
              if (userState.reviewPending == undefined) {
                const reviewPending = await CHECK_REVIEWS();
                if (reviewPending) {
                  toggleReviewModal(true);
                } else {
                  toggleBooking(true);
                }
              } else {
                if (userState.reviewPending) {
                  toggleReviewModal(true);
                } else {
                  toggleBooking(true);
                }
              }
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

  useEffect(() => {
    if (showReviews) {
      executeScroll();
    }
  }, [showReviews]);

  return item ? (
    <div className="item-page-background">
      <div className="container-l background">
        <div className="item-page">
          {(itemOwner || userState.user.admin) && !isMobile && (
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
                    prompt(
                      t("item-page.delete-prompt", {
                        item_title: item.title,
                      }),
                      t("utility.prompt.irreversible"),
                      () => {
                        removeItem(item.id);
                      }
                    );
                  }}
                ></TrashIcon>
              </div>
            </div>
          )}
          <div className="item-page-left">
            {isMobile && (
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
            )}
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
              {!isMobile && (
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
              )}
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
                    <span>/{t("item-page.day")}</span>
                  </div>
                </div>
                <div className="price">
                  <div className="price-title">
                    {t("item-page.price-weekly")}
                  </div>
                  <div className="price-price">
                    {euroLocale.format(item.rentPriceWeek)}
                    <span>/{t("item-page.day")}</span>
                  </div>
                </div>
                <div className="price">
                  <div className="price-title">
                    {t("item-page.price-monthly")}
                  </div>
                  <div className="price-price">
                    {euroLocale.format(item.rentPriceMonth)}
                    <span>/{t("item-page.day")}</span>
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
            <div
              className={classNames(
                "item-page-right-field",
                !isMobile && "flex-row"
              )}
            >
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
                  <div className="title-minor-icon">
                    <QuestionIconCircle></QuestionIconCircle>
                  </div>
                  <div className="title-minor-tooltip">
                    {t("item-page.review-tooltip")}
                  </div>
                </div>
                {item.recentReview ? (
                  <div className="item-page-right-review-contents">
                    <div className="item-page-right-review-text">
                      <div className="item-page-right-review-text-user">
                        <div className="user">
                          <img
                            src={apiUrl + "/" + item.recentReview.image}
                          ></img>
                          {item.recentReview.username}
                        </div>
                        <a
                          className="read-more-link"
                          onClick={() => {
                            if (showReviews) {
                              executeScroll();
                            } else {
                              toggleReviews(true);
                            }
                          }}
                        >
                          {t("item-page.read-more")}
                        </a>
                      </div>
                      <div className="item-page-right-review-text-content">
                        {item.recentReview.text}
                      </div>
                    </div>
                    <div className="item-page-right-review-title">
                      {item.recentReview.type == "positive" ? (
                        <ThumbUpIcon></ThumbUpIcon>
                      ) : (
                        <ThumbDownIcon></ThumbDownIcon>
                      )}

                      {t("item-page.recommended")}
                    </div>
                  </div>
                ) : (
                  <div className="item-page-right-review-contents">
                    <h2 style={{ textAlign: "center", color: "#a3a3a3" }}>
                      {t("item-page.no-reviews")}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
        <Modal modalOpen={reviewModal} toggleModal={toggleReviewModal}>
          <div className="leave-review-modal">
            <LeaveReviewForm
              modal={true}
              id={userState.reviewPending}
              title={t("item-page.leave-review-pls")}
            ></LeaveReviewForm>
          </div>
        </Modal>
      </div>
      {showReviews && (
        <div className="container-m item-page-reviews" ref={reviewsRef}>
          <Reviews itemID={id}></Reviews>
        </div>
      )}
    </div>
  ) : (
    <div className="item-page-background">
      <div className="container-l background">
        <div className="item-page">
          <div className="item-page-left">
            {isMobile && (
              <div className="title-field" style={{ height: "35px" }}>
                <div className="title-field-left" style={{ width: "250px" }}>
                  <BaseSkeletonShimmer type="title"></BaseSkeletonShimmer>
                </div>
                <div className="ratio">
                  0<ThumbUpIcon className="likes"></ThumbUpIcon>0
                  <ThumbDownIcon className="dislikes"></ThumbDownIcon>
                </div>
              </div>
            )}
            <ItemPageGallerySkeleton></ItemPageGallerySkeleton>
            <div className="title-margin">{t("item-page.location")}</div>
            <ItemPageMapSkeleton></ItemPageMapSkeleton>
          </div>
          <div className="item-page-right">
            <div className="item-page-right-field">
              {!isMobile && (
                <div className="title-field">
                  <BaseSkeletonShimmer type="title"></BaseSkeletonShimmer>
                  <div className="ratio">
                    0<ThumbUpIcon className="likes"></ThumbUpIcon>0
                    <ThumbDownIcon className="dislikes"></ThumbDownIcon>
                  </div>
                </div>
              )}
            </div>
            <div className="title-margin">{t("item-page.prices")}</div>
            <SkeletonWrapper>
              <div className="item-page-right-field center">
                <div className="item-page-right-prices">
                  <div className="price">
                    <div className="price-title">
                      {t("item-page.price-daily")}
                    </div>
                    <div className="price-price">
                      <span>/{t("item-page.day")}</span>
                    </div>
                  </div>
                  <div className="price">
                    <div className="price-title">
                      {t("item-page.price-weekly")}
                    </div>
                    <div className="price-price">
                      <span>/{t("item-page.day")}</span>
                    </div>
                  </div>
                  <div className="price">
                    <div className="price-title">
                      {t("item-page.price-monthly")}
                    </div>
                    <div className="price-price">
                      <span>/{t("item-page.day")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SkeletonWrapper>
            <SkeletonWrapper>
              <div
                className="availablity-button"
                disabled
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                {t("item-page.loading")}
              </div>
            </SkeletonWrapper>

            <div className="item-page-right-field">
              <div className="title-margin">{t("item-page.desc")}</div>
              <div className="description" key="RU">
                <ItemPageDescriptionSkeleton></ItemPageDescriptionSkeleton>
              </div>
            </div>
            <div
              className={classNames(
                "item-page-right-field",
                !isMobile && "flex-row"
              )}
            >
              <div className="item-page-right-owner">
                <div className="title-minor">{t("item-page.owner")}</div>
                <div className="item-page-right-owner-contents">
                  <ItemPageOwnerSkeleton></ItemPageOwnerSkeleton>
                </div>
              </div>

              <div className="item-page-right-review">
                <div className="title-minor">
                  {t("item-page.recent-review")}
                  <div className="title-minor-icon">
                    <QuestionIconCircle></QuestionIconCircle>
                  </div>
                  <div className="title-minor-tooltip">
                    {t("item-page.review-tooltip")}
                  </div>
                </div>

                <div className="item-page-right-review-contents">
                  <ItemPageReviewSkeleton></ItemPageReviewSkeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
