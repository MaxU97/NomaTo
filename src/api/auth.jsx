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
      debugger;
      localStorage.setItem("avatarUrl", data.profileImage);
      console.log(data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const signUp = async (props) => {
  debugger;
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

export const preRegEmail = async (props) => {
  return await api
    .post(`/auth/preRegEmail`, { ...props })
    .then(({ data }) => {
      return data.email;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const resendEmailCode = async (props) => {
  return await api
    .post(`/auth/resendEmailCode`, { ...props })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
export const resendPhoneCode = async (props) => {
  return await api
    .post(`/auth/resendPhoneCode`, { ...props })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const preRegPhone = async (props) => {
  return await api
    .post(`/auth/preRegPhone`, { ...props })
    .then(({ data }) => {
      return data.phone;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const sendEmailCode = async (props) => {
  return await api
    .post(`/auth/confirmEmail`, { ...props })
    .then(({ data }) => {
      debugger;
      return data.message;
    })
    .catch((err) => {
      debugger;
      throw err.response.data;
    });
};
export const sendPhoneCode = async (props) => {
  return await api
    .post(`/auth/confirmPhone`, { ...props })
    .then(({ data }) => {
      debugger;
      return data._id;
    })
    .catch((err) => {
      debugger;
      throw err.response.data;
    });
};
export const getBookingHistory = async () => {
  return await api
    .get("/booking/getBookingHistory")
    .then(({ data }) => {
      return data.bookingHistory;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getBookingRequests = async () => {
  return await api
    .get("/booking/getRequests")
    .then(({ data }) => {
      return data.bookingRequests;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
