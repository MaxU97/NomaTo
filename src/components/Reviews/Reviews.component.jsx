import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getReviews } from "../../api/reviews";
import Review from "./Review.component";
import "./reviews.scss";
const Reviews = ({ itemID }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState();
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewList = await getReviews(itemID);
      setReviews(reviewList);
    };
    fetchReviews();
  }, []);
  return (
    <div className="reviews">
      <h1>{t("item-page.reviews")}</h1>
      <div className="reviews-grid">
        {reviews &&
          reviews.map((review, index) => {
            if (index % 2 == 0) {
              return (
                <Review
                  review={review}
                  // direction={"rtl"}
                  // alignSelf={"flex-end"}
                ></Review>
              );
            } else {
              return <Review review={review}></Review>;
            }
          })}
      </div>
    </div>
  );
};

export default Reviews;
