import React, { useEffect } from "react";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import AdminBookingRequest from "./AdminBookingRequest";
import AdminBooking from "./AdminBooking";

const BookingsBlock = ({ bookings }) => {
  return (
    <div className="user-overview-field user-bookings">
      <h2>User Bookings</h2>
      <div className="user-bookings-scrollable">
        <table>
          <tr>
            <th>Item</th>
            <th>Owner</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Extras</th>
            <th>Comment</th>
            <th>Stripe Intent</th>
          </tr>

          {bookings ? (
            bookings.map((booking, index) => {
              return <AdminBooking booking={booking}></AdminBooking>;
            })
          ) : (
            <SpinnerAnimationIcon></SpinnerAnimationIcon>
          )}
        </table>
      </div>
    </div>
  );
};

export default BookingsBlock;
