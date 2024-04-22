import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HeaderFriend from "../components/Friends/HeaderFriend";
import CartFriends from "../components/Friends/CartFriends";
import products from "../data/Products";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowerAndFollowingByAccountId,
  getSuggestionAccountByAccountId,
} from "../app/Account/actions";
import ROUTES from "../constants/routes";
import Skeleton from "../components/Skeleton/Skeleton";

const FriendScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item } = route?.params;

  const accountSuggestion = useSelector(
    (state) => state.account.accountSuggestion
  );
  const accountFollowInfo = useSelector(
    (state) => state.account.accountFollowInfo
  );

  const loadingFriend = useSelector((state) => state.account.loadingFriend);

  const navigateToCardDetail = (item) => {
    navigation.navigate(ROUTES.CARTDETAIL, { item });
  };

  const fetchAccountSuggestion = async () => {
    await dispatch(getSuggestionAccountByAccountId(item?.accountId)).then(
      (res) => {
        console.log("res", JSON.stringify(res, null, 2));
      }
    );
  };

  const fetchFollowerAndFollowingByAccountId = async () => {
    await dispatch(getFollowerAndFollowingByAccountId(item?.accountId));
  };

  const [loading, setLoading] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setLoading(null);
      const fetch = async () => {
        await fetchAccountSuggestion();
        await fetchFollowerAndFollowingByAccountId();
        setLoading("");
      };
      fetch();
    }, [item])
  );

  return loading !== null ? (
    <View style={styles.container}>
      <HeaderFriend
        navigation={navigation}
        accountSuggestion={accountSuggestion}
      />
      <View style={styles.hr} />
      {/* <CartFriends /> */}

      <FlatList
        data={accountSuggestion?.posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigateToCardDetail(item)}>
            <CartFriends
              item={item}
              index={index}
              fetchAccountSuggestion={fetchAccountSuggestion}
            />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});

export default FriendScreen;
