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

export const patchItem = async (data) => {
  return await api
    .patch(`/item/update`, data)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const deleteItem = async (data) => {
  return await api
    .post(`/item/delete`, data)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getItem = async (id) => {
  return await api
    .post(`/item/get`, { id: id })
    .then(({ data }) => {
      return data["item"];
    })
    .catch((err) => {
      throw err;
    });
};

export const toggleItemVisibility = async (data) => {
  return await api
    .patch(`/item/toggleVisibility`, data)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data.message;
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

export const getMyItems = async () => {
  return await api
    .get(`/item/me`)
    .then(({ data }) => {
      return data.items;
    })
    .catch((err) => {
      console.error(err.response.data);
      return false;
    });
};

export const getReviewItem = async (id) => {
  return await api
    .get(`/item/reviewItem`, { params: { id: id } })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const submitReview = async (props) => {
  return await api
    .post(`/item/submitReview`, props)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
