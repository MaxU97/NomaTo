import api from "./config";

export const newsUpload = async (data) => {
  return await api
    .post(`/news/upload`, data)
    .then((data) => {
      return "DONE!";
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getNews = async (amount) => {
  return await api
    .get(`/news/getNews`, { params: { amount: amount } })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getNewsSpecific = async (data) => {
  return await api
    .post(`/news/getNewsSpecific`, data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
