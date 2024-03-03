import axios from "axios";

const url = "https://swdprojectapi.azurewebsites.net/api/";

const instance = axios.create({
  baseURL: url, 
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
