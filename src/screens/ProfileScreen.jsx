
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
// import HeaderProfile from "../components/Profile/HeaderProfile";
// import ProfileTab from "../components/Profile/ProfileTab";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../app/hooks";
// import { getProfile } from "../features/userSlice";

// const ProfileScreen = () => {
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [username, setUsername] = useState(null);
//   const accountId = useSelector((state) => state.user.accountId);
//   const profile = useSelector((state) => state.user.profile);


//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(getProfile(accountId ?? null)).then((res) => {
//         console.log(JSON.stringify(res, null, 2));
//       });
//     };
//     fetchData();
//   }, [accountId]);

//   console.log("object");
//   return (
//     <View style={styles.container}>
//       <HeaderProfile userInfo={userData} username={username} profile={profile} />
//       <View style={styles.hr} />
//       <ProfileTab userData={userData} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   hr: {
//     borderBottomColor: "lightgray",
//     borderBottomWidth: 1,
//     marginTop: 20,
//   },
// });

// export default ProfileScreen;
// ProfileScreen.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { getProfile } from "../features/userSlice";
import ProfileLoggedIn from "../components/Profile/ProfileLoggedIn";
import ProfileNotLoggedIn from "../components/Profile/ProfileNotLoggedIn";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const accountId = useSelector((state) => state.user.accountId);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile(accountId ?? null)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    };
    fetchData();
  }, [accountId]);

  return accountId ? <ProfileLoggedIn profile={profile} /> : <ProfileNotLoggedIn />;
};

export default ProfileScreen;
