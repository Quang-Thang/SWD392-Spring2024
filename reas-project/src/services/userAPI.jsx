import axiosClient from "./axiosClient";

const userAPI = {
  getAll(params) {
    const url = "api/User";
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `api/User/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "api/User";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `api/User/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `api/User/${id}`;
    return axiosClient.delete(url);
  },
};

export default userAPI;
