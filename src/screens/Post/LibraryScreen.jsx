import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const LibraryScreen = ({ images }) => {
console.log('Image:', images);
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
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