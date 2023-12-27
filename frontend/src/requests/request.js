import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config/serverApiConfig";

import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const refreshToken = async (refreshToken) => {
  const decodedToken = jwtDecode(refreshToken);
  const date = new Date();
  if (decodedToken.exp < date.getTime() / 1000) {
    return null;
  }
  try {
    const res = await axios.post("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (res.statusCode !== 200) {
      return null;
    }
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

let axiosInstance = null;

export const createAxios = (user, dispatch, stateSuccess) => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.tokens.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        if (!data) {
          return null;
        }
        const refreshUser = {
          ...user,
          tokens: { ...user.tokens, accessToken: data.accessToken },
        };
        dispatch(stateSuccess(refreshUser));
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

const request = {
  create: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.post(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }) => {
    try {
      const response = await axiosInstance.get(entity + id);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ entity, id, jsonData }) => {
    try {
      const response = await axiosInstance.put(entity + id, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  delete: async ({ entity, id }) => {
    try {
      const response = await axiosInstance.delete(entity + id);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  get: async ({ entity }) => {
    try {
      const response = await axiosInstance.get(entity);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  post: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.post(entity, jsonData);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  put: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async ({ entity, options = {} }) => {
    try {
      const { filter, equal, ...restOptions } = options;
      const params = {
        filter: filter || undefined,
        equal: equal || undefined,
        ...restOptions,
      };
      const response = await axiosInstance.get(`${entity}`, { params });
      successHandler(response);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async ({ entity, options = {} }) => {
    try {
      const response = await axiosInstance.get(`${entity}/search`, {
        params: options,
      });
      successHandler(response);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ entity, options = {} }) => {
    try {
      const response = await axiosInstance.get(`${entity}/list`, {
        params: options,
      });
      successHandler(response);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  listAll: async ({ entity }) => {
    try {
      const response = await axiosInstance.get(entity + "/listAll");

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  upload: async ({ entity, id, jsonData }) => {
    try {
      const response = await axiosInstance.patch(
        entity + "/upload/" + id,
        jsonData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axiosInstance.CancelToken;
    const source = CancelToken.source();
    return source;
  },

  summary: async ({ entity }) => {
    try {
      const response = await axiosInstance.get(entity + "/summary");

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  mail: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.post(entity + "/mail/", jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  convert: async ({ entity, id }) => {
    try {
      const response = await axiosInstance.get(`${entity}/convert/${id}`);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};
export default request;
