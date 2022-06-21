import api from "./config";

export const getClientSecret = async (data) => {
  return await api
    .post(`/booking/request`, data)
    .then(({ data }) => {
      return data.clientSecret;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getPaymentMethods = async () => {
  return await api
    .get(`/booking/getPaymentMethods`)
    .then(({ data }) => {
      return data.methods;
    })
    .catch((err) => {
      console.log(err.response.data);
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

export const sendBookingToOwner = async (data) => {
  return await api
    .post(`/booking/sendBookingToOwner`, data)
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
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
      console.log(err.response.data);
      return false;
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
