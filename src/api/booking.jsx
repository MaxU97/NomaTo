import api from "./config";

export const sendBookingToOwner = async (payment_intent, intentID) => {
  return await api
    .post(`/booking/sendBookingToOwner`, {
      payment_intent: payment_intent,
      intentID: intentID,
    })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const cancelBooking = async (id) => {
  return await api
    .post(`/booking/cancelBooking`, { booking_id: id })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
    });
};

export const refuseBooking = async (_id, reason) => {
  return await api
    .post(`/booking/refuseBooking`, { booking_id: _id, reason: reason })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
    });
};

export const approveBooking = async (_id) => {
  return await api
    .post(`/booking/approveBooking`, { booking_id: _id })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getApprovedUser = async (_id, booking_id) => {
  return await api
    .post(`/booking/getApprovedUser`, { userID: _id, booking_id: booking_id })
    .then(({ data }) => {
      return data.userDetails;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
    });
};
export const getServiceFee = async () => {
  return await api
    .get(`/booking/getServiceFee`)
    .then(({ data }) => {
      return data.serviceFee;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
    });
};

export const qrCodeScan = async (options) => {
  return await api
    .post(`/booking/scanQR`, options)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getBookedDates = async (props) => {
  return await api
    .post(`/booking/getBookedDates`, props)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getAvailableQuantity = async (props) => {
  return await api
    .post(`/booking/getQty`, props)
    .then(({ data }) => {
      return data.qtyAvailable;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const recordBooking = async (data) => {
  return await api
    .post(`/booking/recordBooking`, data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getClientSecret = async (data) => {
  return await api
    .post(`/booking/request`, data)
    .then(({ data }) => {
      return data.clientSecret;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const checkPendingReview = async () => {
  return await api
    .get(`/booking/checkPendingReview`)
    .then(({ data }) => {
      return data.review_pending;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
