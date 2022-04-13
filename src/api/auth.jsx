import api from "./config";

export const login = async (props) => {
  console.log("PROPS:");
  console.log(props);
  return await api
    .post(`/auth/login`, {
      ...props,
    })
    .then(({ data }) => {
      return data.accessToken;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async () => {
  return await api
    .get(`/auth/me`)
    .then(({ data }) => {
      localStorage.setItem("avatarUrl", data.profileImage);
      console.log(data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const signUp = async (props) => {
  return await api
    .post(`/auth/signup`, {
      ...props,
    })
    .then(({ data }) => {
      return data.accessToken;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
