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
  updateProfile: (key, City, Address, Height, Phone, Gender, Dob) => {
    const formData = new FormData();

    // Append accountId to the form data
    formData.append('accountId', key);
    formData.append('City', City);
    formData.append('Address', Address);
    formData.append('Gender', Gender);
    formData.append('Phone', Phone);
    formData.append('Dob', Dob);
    formData.append('Height', Height);

    const url = `/api/Users/Put/User/${key}/UpdateUser`;

    // Make sure to include headers for form data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient.put(url, formData, config)
      .then((response) => {
        // Xử lý response nếu cần
        return response.data;
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        throw error;
      });
  },
};
