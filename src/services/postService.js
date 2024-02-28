import axiosClient from "./axiosClient";

export const postService = {
  createnewpost: ({ Content, Image, Hashtags }) => {
    const formData = new FormData();

    formData.append('Content', Content);
    formData.append('Image', Image);
    formData.append('Hashtags', Hashtags);

    const url = "/odata/Post/AddNewPost";
    return axiosClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
  getDetailHashtag: () => {
    const url = `/odata/Hashtags/GetHashTag`;
    return axiosClient.get(url);
  },
};