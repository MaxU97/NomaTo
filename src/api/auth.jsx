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

export const logout = () => {
  localStorage.removeItem("token");
};

export const patchUser = async (props) => {
  return await api
    .patch(`/auth/patchUser`, props)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
export const patchAddress = async (props) => {
  return await api
    .patch(`/auth/patchAddress`, props)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const patchImage = async (props) => {
  return await api
    .patch(`/auth/patchImage`, props)
    .then(({ data }) => {
      localStorage.setItem("avatarUrl", data.profileImage);
      return data;
    })
    .catch((err) => {
      throw err;
    });
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
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
export const sendPhoneCode = async (props) => {
  return await api
    .post(`/auth/confirmPhone`, { ...props })
    .then(({ data }) => {
      return data._id;
    })
    .catch((err) => {
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

export const sendForgetEmail = async (props) => {
  return await api
    .post("/auth/sendForgetEmail", props)
    .then(({ data }) => {
      return data.returnMessage;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const sendForgotCode = async (props) => {
  return await api
    .post("/auth/sendForgotCode", props)
    .then(({ data }) => {
      return data.returnMessage;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
export const resendForgotPassword = async (props) => {
  return await api
    .post(`/auth/resendForgotPassword`, { ...props })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const sendResetPassword = async (props) => {
  return await api
    .post(`/auth/sendResetPassword`, { ...props })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const sendChangePassword = async (props) => {
  return await api
    .patch(`/auth/sendChangePassword`, { ...props })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getUserBalance = async () => {
  return await api
    .get(`/auth/userBalance`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const createStripe = async (props) => {
  return await api
    .post(`/auth/createStripeAccount`, props)
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getUserId = async (id) => {
  return await api
    .get(`/auth/getUser`, { params: { id: id } })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getUserReviews = async (id) => {
  return await api
    .get(`/auth/getUserReviews`, { params: { id: id } })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const getUserBookings = async (id) => {
  return await api
    .get(`/auth/getUserBookings`, { params: { id: id } })
    .then(({ data }) => {
      return data.message;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
