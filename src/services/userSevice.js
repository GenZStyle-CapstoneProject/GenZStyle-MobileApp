import axiosClient from "./axiosClient";

export const userService = {
  login: ({ userName, passwordHash }) => {
    const url = "/odata/authentications/login";
    return axiosClient.post(url, { ...{ userName, passwordHash } });
  },
  getProfile: (key) => {
    const url = `/api/Users/Get/odata/Users/${key}/GetUserByAccountId`;
    return axiosClient.get(url);
  },
  updateProfile: (userId, updatedProfile) => {
    const url = `/api/Users/Put/User/key/UpdateUser/${userId}`;
    return axiosClient.put(url, updatedProfile);
  },
};
