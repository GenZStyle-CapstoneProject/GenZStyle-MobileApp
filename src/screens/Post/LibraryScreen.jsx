
// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const LibraryScreen = () => {
//   const [libraryImages, setLibraryImages] = useState([]);

//   const fetchLibraryImages = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     const pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     if (!pickerResult.cancelled) {
//       setLibraryImages([pickerResult]);
//     }
//   };

//   useEffect(() => {
//     fetchLibraryImages();
//   }, []); // Fetch library images when the component mounts

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={libraryImages}
//         keyExtractor={(item) => item.uri}
//         renderItem={({ item }) => (
//           <Image
//             source={{ uri: item.uri }}
//             style={styles.image}
//           />
//         )}
//         numColumns={3}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     margin: 4,
//   },
// });

// export default LibraryScreen;
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const LibraryScreen = () => {
  const [libraryImages, setLibraryImages] = useState([]);

  const fetchLibraryImages = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: 20,
    });

    setLibraryImages(assets);
  };

  useEffect(() => {
    fetchLibraryImages();
  }, []); // Fetch library images when the component mounts

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
          />
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

export default LibraryScreen;
