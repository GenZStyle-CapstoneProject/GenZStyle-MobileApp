import axiosClient from "./axiosClient";

export const accountService = {
  updateAccount: (key) => {
    const url = `/odata/Accounts/${key}/Update`;
    return axiosClient.put(url);
  },
  getAccountWithPostList: (username) => {
    const url = `/odata/Accounts/SearchByUserName?username=${username}`;
    return axiosClient.get(url);
  },
};
