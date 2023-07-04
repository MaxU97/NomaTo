import api from "./config";

export const banUser = async (props) => {
  return await api
    .post(`/admin/ban`, props)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const warnUser = async (props) => {
  return await api
    .post(`/admin/warn`, props)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const toggleAdmin = async (props) => {
  return await api
    .post(`/admin/toggleAdmin`, props)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const removeWarnings = async (props) => {
  return await api
    .post(`/admin/removeWarnings`, props)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getUserRequests = async (id) => {
  return await api
    .get(`/admin/getUserRequests`, { params: { id: id } })
    .then(({ data }) => {
      return data.bookingRequests;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getUserBookings = async (id) => {
  return await api
    .get(`/admin/getUserBookings`, { params: { id: id } })
    .then(({ data }) => {
      return data.bookings;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getUserList = async (params) => {
  return await api
    .get(`/admin/getUserList`, { params: params })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getNewsList = async (params) => {
  return await api
    .get(`/admin/getNewsList`, { params: params })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
