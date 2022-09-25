import api from "./config";

export const newsUpload = async (data) => {
  return await api
    .post(`/news/upload`, data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const newsUpdate = async (data) => {
  return await api
    .patch(`/news/update`, data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const newsDelete = async (id) => {
  return await api
    .patch(`/news/delete`, { id: id })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getNews = async (amount) => {
  return await api
    .get(`/news/getNews`, { params: { amount: amount } })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getNewsSpecific = async (id) => {
  return await api
    .get(`/news/get`, { params: { id: id } })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const toggleNewsVisibility = async (id) => {
  return await api
    .patch(`/news/toggleVisibility`, { id: id })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};
