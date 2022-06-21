import api from "./config";
export const getCategories = async () => {
  return await api
    .get("/categories/get")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const createCategory = async (category) => {
  return await api
    .post("/categories/createCategory", category)
    .then(({ data }) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const checkExistingCategory = async (categoryNames) => {
  return await api
    .post("/categories/checkExisting", categoryNames)
    .then(() => {
      return false;
    })
    .catch((err) => {
      return true;
    });
};

export const deleteCategory = async (id) => {
  return await api
    .post("/categories/deleteCategory", { _id: id })
    .then(() => {
      return false;
    })
    .catch((err) => {
      return true;
    });
};

export const checkCategoryDependancies = async (id) => {
  return await api
    .post("/categories/checkCategoryDependancies", { _id: id })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
