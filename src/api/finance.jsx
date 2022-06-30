import api from "./config";
export const withdraw = async (props) => {
  return await api
    .post("/finance/withdraw", props)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
