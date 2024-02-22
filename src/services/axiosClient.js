import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../env";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  // validateStatus: (status) => {
  //     return status < 500;
  // }
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN")
 
  console.log("<AxiosClient> ACCESSTOKEN: ", accessToken);
  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    customHeaders.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("<AxiosClient> ACCESS TOKEN FAILED!");
  }

  return {
    ...config,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

// createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

// HOW TO CALL EXTERNAL API

// const getExternalApi = () => {
//   const url = '/resource-name';
//   const config = {
//     baseURL: 'https://your-new-base-api-url.com/api',
//     headers: {
//       Authorization: 'your-new-token-to-use-in-new-api',
//     },
//   };

//   return axiosClient.get(url, config);
// };

export default axiosClient;
