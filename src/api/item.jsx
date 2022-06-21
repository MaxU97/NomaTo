import api from "./config";

export const uploadItem = async (data) => {
  return await api
    .post(`/item/upload`, data)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getItem = async (id) => {
  return await api
    .post(`/item/get`, { id: id })
    .then(({ data }) => {
      return data["item"];
    })
    .catch((err) => {
      console.error(err.response.data);
      return false;
    });
};

export const getPopular = async () => {
  return await api
    .get(`/item/getpopular`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const searchItems = async (term) => {
  return await api
    .post(`/item/search`, term)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err.response.data);
      return false;
    });
};
