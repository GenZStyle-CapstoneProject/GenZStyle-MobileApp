import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import CartEveryoneSearch from "./CartEveryoneSearch";
import images from "../../data/Image";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import products from "../../data/Products";
import ROUTES from "../../constants/routes";

const EveryoneSearch = () => {
  const navigation = useNavigation();

  const navigateToCartDetail = (item) => {
    // Chuyển đến màn hình CartDetail và truyền postId
    navigation.navigate(ROUTES.CARTDETAIL, { item });
  };

  const navigateToHashtagView = () => {
    // Chuyển đến màn hình mong muốn khi TouchableOpacity được nhấn
    navigation.navigate(ROUTES.HASHTAGVIEW);
  };

  const HeaderComponent = () => (
    <>
      <View style={style.userContainer}>
        <Avatar
          activeOpacity={0.2}
          avatarStyle={{}}
          containerStyle={{ backgroundColor: "#BDBDBD" }}
          icon={{}}
          iconStyle={{}}
          imageProps={{}}
          onLongPress={() => alert("onLongPress")}
          onPress={() => alert("onPress")}
          overlayContainerStyle={{}}
          placeholderStyle={{}}
          rounded
          size="medium"
          source={{
            uri: "https://p7.hiclipart.com/preview/173/259/723/social-media-number-sign-hashtag-symbol-tags.jpg",
          }}
          title="P"
          titleStyle={{}}
        />
        <View style={style.userInfo}>
          <Text style={{ fontWeight: "bold" }}>{`${products[0].hashtag}`}</Text>
          <View style={style.separatorText}>
            <Text style={{ color: "#9D9FB7" }}>173 bài viết</Text>
          </View>
        </View>
        <TouchableOpacity style={style.Button} onPress={navigateToHashtagView}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={style.Container}>
        <View>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
                <CartEveryoneSearch item={item} />
              </TouchableOpacity>
            )}
            numColumns={3}
            ListHeaderComponent={HeaderComponent}
          />
          
        </View>
      </View>
    </View>
  );
};

export default EveryoneSearch;

const style = StyleSheet.create({
  Container: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userInfo: {
    flex: 1, // Để Avatar và userInfo có cùng độ rộng
    marginLeft: 10,
  },
  Button: {
    justifyContent: "center",
  },
  separatorText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
