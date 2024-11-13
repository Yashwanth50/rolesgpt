import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import ApiError from "./api-error";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const axiosExternalClient = axios.create({
  baseURL: process.env.REACT_APP_EXTERNAL_API_URL,
});

async function deleteApi<T>(url: string, data?: T): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosClient.delete(url, { data });
    return response.data;
  } catch (error) {
    throw new ApiError(error as AxiosError);
  }
}

async function post<T>(url: string, data: T): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosClient.post(url, data);
    return response.data;
  } catch (error) {
    throw new ApiError(error as AxiosError);
  }
}

async function externalPost<T>(url: string, data: T): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosExternalClient.post(
      url,
      data
    );
    return response.data;
  } catch (error) {
    throw new ApiError(error as AxiosError);
  }
}

async function put<T>(url: string, data: T): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosClient.put(url, data);
    return response.data;
  } catch (error) {
    throw new ApiError(error as AxiosError);
  }
}

async function get<T>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw new ApiError(error as AxiosError);
  }
}

// Automatically add token from localStorage to each request
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers["Token"] = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function clearApiAccessToken() {
  axiosClient.interceptors.request.clear();
}

const apiClient = { post, get, put, deleteApi, externalPost };

export { apiClient, clearApiAccessToken };
