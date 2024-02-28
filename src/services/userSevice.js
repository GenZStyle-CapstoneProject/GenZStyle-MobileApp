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
  updateProfile: async (key, City, Address, Height, Phone, Gender, Dob) => {
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


    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axiosClient.put(url, formData, config);
      return response.data;
    } catch (error) {
      // Xử lý lỗi nếu cần
      throw error;
    }
  },
};
