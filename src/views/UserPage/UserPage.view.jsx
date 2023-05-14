import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBookings, getUserRequests } from "../../api/admin";
import { getUserId } from "../../api/auth";
import { apiUrl } from "../../api/config";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { usePromptHandler } from "../../components/Prompt/Prompt.component";
import BaseSkeleton from "../../skeletons/BaseSkeleton/BaseSkeleton.component";
import HeaderSkeleton from "../../skeletons/HeaderSkeleton/HeaderSkeleton.component";
import SkeletonWrapper from "../../skeletons/SkeletonWrapper";
import ActionBar from "./ActionBar";
import BookingRequestsBlock from "./BookingRequestsBlock";
import DetailsBlock from "./DetailsBlock";
import "./userpage.scss";
import BookingsBlock from "./BookingsBlock";
const UserPage = () => {
  const { id } = useParams();
  const { notification } = useNotificationHandler();
  const { prompt } = usePromptHandler();

  const [detailsErrored, setDetailsErrored] = useState(false);
  const [details, setDetails] = useState();

  const [requestsErrored, setRequestsErrored] = useState(false);
  const [requests, setRequests] = useState();

  const [bookingsErrored, setBookingsErrored] = useState(false);
  const [bookings, setBookings] = useState();

  useEffect(() => {
    loadDetails();
    loadRequests();
    loadBookings();
    loadReviews();
  }, []);

  const loadDetails = async () => {
    try {
      const details = await getUserId(id);
      setDetails(details);
    } catch (e) {
      setDetailsErrored(true);
      notification([e], true);
    }
  };
  const loadRequests = async () => {
    try {
      const requests = await getUserRequests(id);
      setRequests(requests);
    } catch (e) {
      setRequestsErrored(true);
      notification([e], true);
    }
  };
  const loadBookings = async () => {
    try {
      debugger;
      const bookings = await getUserBookings(id);
      setBookings(bookings);
    } catch (e) {
      setBookingsErrored(true);
      notification([e], true);
    }
  };
  const loadReviews = async () => {};
  return (
    <div className="user-overview">
      <div className="container-xl">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80px",
          }}
        >
          User:
          {details ? (
            " " + details.name + " " + details.surname
          ) : (
            <SpinnerAnimationIcon scale={0.5}></SpinnerAnimationIcon>
          )}
        </h1>
        <div className="user-overview-container">
          <ActionBar details={details}></ActionBar>
          <div className="user-overview-top">
            <DetailsBlock details={details}></DetailsBlock>
            <div className="user-overview-field user-reviews">
              <h2>User Left Reviews</h2>
            </div>
          </div>
          <div className="user-overview-bottom">
            <BookingRequestsBlock requests={requests}></BookingRequestsBlock>
            <BookingsBlock bookings={bookings}></BookingsBlock>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
