import { getReviewItem, submitReview } from "../../api/item";
import {
  SmileyIcon,
  SpinnerAnimationIcon,
  SpinnerIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "../../assets/Icons";
import Input from "../../components/Input/Input.component";
import TextArea from "../../components/TextArea/TextArea.component";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import "./leavereview.scss";
import { apiUrl } from "../../api/config";
import { getCurrentLanguage } from "../../services/language.service";
const LeaveReviewForm = ({ id, title, modal = false }) => {
  const { t } = useTranslation();

  const [item, setItem] = useState();
  const [reviewType, setReviewType] = useState();
  const [review, setReview] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { notification } = useNotificationHandler();

  useEffect(() => {
    const init = async () => {
      if (id) {
        var item;
        try {
          item = await getReviewItem(id);
        } catch (err) {
          window.location.href = "/bookings";
        }

        if (item.reviewed) {
          setTimeout(() => {
            if (location.state) {
              window.location.href = location.state.from;
            } else {
              window.location.reload();
            }
          }, 1500);
        }
        setItem(item);
      }
    };
    init();
  }, []);

  const submit = async () => {
    try {
      setLoading(true);
      const response = await submitReview({
        id: id,
        review: review,
        reviewType: reviewType,
      });

      notification([response.message], false, modal && 999);
      setTimeout(() => {
        if (location.state) {
          window.location.href = location.state.from;
        } else {
          window.location.reload();
        }
      }, 1500);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notification([err.message], true, modal && 999);
    }
  };
  return (
    <div className="leave-review">
      {item ? (
        <>
          <h1>{title ? title : t("leave-review.title")}</h1>
          <div className="leave-review-content">
            {item.reviewed ? (
              <>
                <SmileyIcon
                  style={{ fill: "#3299de", height: "100px", width: "auto" }}
                ></SmileyIcon>
                <h2>{t("leave-review.item-reviewed")}</h2>
              </>
            ) : (
              <>
                <div className="leave-review-item">
                  <img src={apiUrl + "/" + item.image}></img>

                  <div className="leave-review-item-details">
                    <div className="leave-review-item-title">{item.title}</div>
                    <div className="leave-review-item-owner">
                      <strong>{t("leave-review.owner")}: </strong>
                      {item.owner}
                    </div>
                    <div className="leave-review-item-dates">
                      <strong>{t("leave-review.dates")}: </strong>
                      {`${new Date(item.dateStart).toLocaleString(
                        getCurrentLanguage(),
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )} -  ${new Date(item.dateEnd).toLocaleString(
                        getCurrentLanguage(),
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}`}
                    </div>
                  </div>
                </div>
                <div className="leave-review-type">
                  <ThumbUpIcon
                    className={classNames("positive", reviewType && "selected")}
                    onClick={() => {
                      setReviewType(true);
                    }}
                  ></ThumbUpIcon>
                  <ThumbDownIcon
                    className={classNames(
                      "negative",
                      !reviewType &&
                        !(reviewType == undefined || reviewType == null) &&
                        "selected"
                    )}
                    onClick={() => {
                      setReviewType(false);
                    }}
                  ></ThumbDownIcon>
                </div>
                <TextArea
                  className="leave-review-text"
                  placeholder={t("leave-review.review")}
                  setValue={setReview}
                  value={review}
                ></TextArea>

                <a
                  className="leave-review-submit"
                  onClick={() => {
                    submit();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerIcon></SpinnerIcon>
                  ) : (
                    t("leave-review.submit")
                  )}
                </a>
              </>
            )}
          </div>
        </>
      ) : (
        <SpinnerAnimationIcon scale={1}></SpinnerAnimationIcon>
      )}
    </div>
  );
};

export default LeaveReviewForm;
