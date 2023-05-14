import React, { useEffect } from "react";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import AdminBookingRequest from "./AdminBookingRequest";

const BookingRequestsBlock = ({ requests }) => {
  return (
    <div className="user-overview-field user-requests">
      <h2>User Bookings Requests</h2>
      <div className="user-requests-scrollable">
        <table>
          <tr>
            <th>Item</th>
            <th>User</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Extras</th>
            <th>Comment</th>
            <th>Stripe Intent</th>
          </tr>

          {requests ? (
            requests.map((request, index) => {
              return (
                <AdminBookingRequest request={request}></AdminBookingRequest>
              );
            })
          ) : (
            <SpinnerAnimationIcon></SpinnerAnimationIcon>
          )}
        </table>
      </div>
    </div>
  );
};

export default BookingRequestsBlock;
