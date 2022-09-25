import api from "./config";

export const getReviews = async (itemID) => {
  return await api
    .get("/reviews/getReviews", { params: { itemID: itemID } })
    .then(({ data }) => {
      return data.reviews;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
