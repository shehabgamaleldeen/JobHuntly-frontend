import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

export const refreshClient = axios.create({
  baseURL: "http://localhost:3000",
});

const getAuthStorage = () => {
  return localStorage.getItem("refreshToken")
    ? localStorage
    : sessionStorage;
};

// request 
instance.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response 
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    if (status === 401) {
      const storage = getAuthStorage();
      const refreshToken = storage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        sessionStorage.clear();
        if (currentPath !== "/login") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await refreshClient.post("/auth/refresh", { refreshToken });

          const newAccessToken = res.data.data.accessToken;
          storage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          localStorage.clear();
          sessionStorage.clear();
          if (currentPath !== "/login") window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    if (status === 403) {
      alert("You are not allowed to access this page.");
    }

    if (status >= 500) {
      alert("Something went wrong on our server. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default instance
