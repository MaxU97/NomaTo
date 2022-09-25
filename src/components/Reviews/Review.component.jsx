import React from "react";
import { apiUrl } from "../../api/config";
import { ThumbDownIcon, ThumbUpIcon } from "../../assets/Icons";
import { formatDate } from "../../services/responsive.service";
const Review = ({ review, direction = "ltr", alignSelf = "flex-start" }) => {
  return (
    <div
      className="review"
      // style={{ direction: direction, alignSelf: alignSelf }}
    >
      <div className="review-type">
        {review.type == "positive" ? (
          <ThumbUpIcon className="positive"></ThumbUpIcon>
        ) : (
          <ThumbDownIcon className="negative"></ThumbDownIcon>
        )}
      </div>
      <div className="review-content">
        <div className="review-top">
          <div className="review-top-user">
            <img src={apiUrl + "/" + review.userID.profileImage}></img>
            <div className="review-top-user-name">{review.userID.name}</div>
          </div>

          <div className="review-top-user-date">
            {formatDate(new Date(review.datePosted))}
          </div>
        </div>
        <div className="review-bottom">
          <div className="review-bottom-text">{review.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
