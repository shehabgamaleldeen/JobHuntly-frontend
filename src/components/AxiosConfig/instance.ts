import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
})

const getAuthStorage = () => {
  return localStorage.getItem("refreshToken")
    ? localStorage
    : sessionStorage;
};

// request interceptor
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
    const data = error.response?.data;
    const currentPath = window.location.pathname;

    if (status === 401) {
    const refreshToken =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");

       if (!refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        
        if (currentPath !== "/login") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post("/auth/refresh", { refreshToken });
          const storage = getAuthStorage();
          storage.setItem("accessToken", res.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return instance(originalRequest);
          
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          if (currentPath !== "/login") window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    if (status === 403) {
      alert(data?.message || "You are not allowed to access this page.");
    }

    if (status >= 500) {
      console.error("Server error:", data?.error || error.message);
    }

    return Promise.reject(error);
  }
);



export default instance
