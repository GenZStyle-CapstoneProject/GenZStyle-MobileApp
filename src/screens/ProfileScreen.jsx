import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { fecthListFollow, getProfile } from "../features/userSlice";
import ProfileLoggedIn from "../components/Profile/ProfileLoggedIn";
import ProfileNotLoggedIn from "../components/Profile/ProfileNotLoggedIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { RefreshControl, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const accountId = useSelector((state) => state.user.accountId);
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  // const [getToken, setToken] = useState(null);
  const followersData = useSelector((state) => state.user.data);
  useFocusEffect(
    useCallback(() => {
      // getAccessToken();
      const fetchData = async () => {
        // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
        // console.log("userInfo", accountId);
        await dispatch(getProfile(accountId)).then((res) => {
          console.log(JSON.stringify(res, null, 2));
        });
      };
      const fecthFollow = async () => {
        // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

        try {
          // console.log("truockhi fecthFollow", followersData);
          await dispatch(fecthListFollow());
        } catch (error) {
          // Handle the error or implement a retry mechanism
          // console.error("Error in fecthFollow:", error);
        }
        // console.log("saukhi fecthFollow:", followersData);
      };

      const fetchAsync = async () => {
        await fetchData();
        await fecthFollow();
      };

      fetchAsync();
    }, [accountId])
  );
  // const getAccessToken = async () => {
  //   const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  //   console.log("AccessToken: " + "<< " + accessToken + " >>");
  //   setToken(accessToken);
  // };

  return (
    //  getToken != null ? (
    <>
      <Spinner visible={loading} />
      <ProfileLoggedIn profile={profile} followersData={followersData} />
    </>
    // ) : (
    //   <ProfileNotLoggedIn />
    // );
  );
};

export default ProfileScreen;
