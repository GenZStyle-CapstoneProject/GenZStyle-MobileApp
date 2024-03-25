// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";


// const BackButton = ({ onPress }) => (
//   <TouchableOpacity onPress={onPress} style={styles.backButton}>
//     <Ionicons name="arrow-back" size={27} color="black" />
//   </TouchableOpacity>
// );
// const ListLike = ({ route }) => {
//   const navigation = useNavigation();
//   const { dataLike } = route.params;
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState(dataLike);
//   console.log(" dataLike ", dataLike);
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const lowerCaseQuery = query.toLowerCase();
//     const filtered = dataLike.filter((item) =>
//       item.username.toLowerCase().includes(lowerCaseQuery)
//     );
//     setFilteredData(filtered);
//   };

//   const accountData = dataLike?.likes?.map((like) => like.account).filter(Boolean);

//   console.log("accountData:", accountData);
//   const renderLikeItem = ({ item }) => {
//     console.log("Item:", item);
//     return (
//       <View style={styles.followerItem}>
//         <Image style={styles.avatar} source={{ uri: item?.avatar }} />
//         <Text style={styles.username}>{item?.username}</Text>
//         <TouchableOpacity style={styles.followButton}>
//           <Text style={styles.followButtonText}>Theo dõi</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };


//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <BackButton onPress={() => navigation.goBack()} />
//         <Text style={styles.title}>Lượt thích</Text>
//       </View>
//       <View style={styles.searchContainer}>
//         <Ionicons
//           name="search-outline"
//           size={24}
//           color="#888"
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Tìm kiếm"
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//       </View>
//       <FlatList
//         data={accountData}
//         keyExtractor={(item) => item?.accountId?.toString()}
//         renderItem={renderLikeItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     marginTop: 20,
//   },
//   backButton: {
//     position: "absolute",
//     left: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//   },
//   followerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 26,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "bold",
//     flex: 1,
//   },
//   followButton: {
//     backgroundColor: "#FF5C5C",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   followButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F3F3F3",
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginTop: 10,
//   },
//   searchIcon: {
//     marginLeft: 10,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingLeft: 10,
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default ListLike;
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ListLike = ({ route }) => {
  const navigation = useNavigation();
  const { dataLike } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataLike);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = dataLike.filter((item) =>
      item.username.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  const renderLikeItem = ({ item }) => (
    <View style={styles.followerItem}>
      <Image style={styles.avatar} source={{ uri: item?.avatar }} />
      <Text style={styles.username}>{item?.username}</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Theo dõi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Lượt thích</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={24}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item?.accountId?.toString()}
        renderItem={renderLikeItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  followButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ListLike;
