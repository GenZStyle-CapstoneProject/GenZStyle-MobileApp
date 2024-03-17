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
  getSuggestionAccount: () => {
    const url = `/odata/Accounts/GetSuggestionAccount`;
    return axiosClient.get(url);
  },
  followOneAccount: (accountId) => {
    const url = `/odata/Users/Follower?AccountId=${accountId}`;
    return axiosClient.post(url);
  },
  getSuggestionAccountByAccountId: (accountId) => {
    const url = `/odata/Accounts/GetSuggestionAccountId?accountId=${accountId}`;
    return axiosClient.get(url);
  },
  getFollowingAccountWithPosts: () => {
    const url = `/odata/UserProfile/Follow`;
    return axiosClient.get(url);
  },
};
