// import React, { useEffect } from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MyPostsScreen from '../../screens/Profile/MyPostsScreen';
// import FavoritesScreen from '../../screens/Profile/FavoritesScreen';
// import SavedScreen from '../../screens/Profile/SavedScreen';
// import MyClothesScreen from '../../screens/Profile/MyClothesScreen';
// import { LogBox } from 'react-native';
// const Tab = createMaterialTopTabNavigator();

// const ProfileTab = () => {
//     useEffect(() => {
//         LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
//     }, [])
//     return (
//         <Tab.Navigator
//             tabBarOptions={{
//                 swipeEnabled: true,
//                 scrollEnabled: true,
//                 activeTintColor: 'black',
//                 inactiveTintColor: 'gray',
//                 indicatorStyle: { backgroundColor: 'black' },
//                 style: { backgroundColor: 'white' },
//             }}

//         >
//             <Tab.Screen name="Bài đăng của tôi" component={MyPostsScreen} />
//             <Tab.Screen name="Yêu thích" component={FavoritesScreen} />
//             <Tab.Screen name="Đã lưu" component={SavedScreen} />
//             <Tab.Screen name="Tủ quần áo của tôi" component={MyClothesScreen} />
//         </Tab.Navigator>
//     );
// };

// export default ProfileTab;
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPostsScreen from '../../screens/Profile/MyPostsScreen';
import FavoritesScreen from '../../screens/Profile/FavoritesScreen';
import SavedScreen from '../../screens/Profile/SavedScreen';
import MyClothesScreen from '../../screens/Profile/MyClothesScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: { backgroundColor: 'black' },
                tabBarStyle: { backgroundColor: 'white' },

            }}
        >
            <Tab.Screen name="Bài đăng của tôi" component={MyPostsScreen} />
            <Tab.Screen name="Yêu thích" component={FavoritesScreen} />
            <Tab.Screen name="Đã lưu" component={SavedScreen} />
            <Tab.Screen name="Tủ quần áo của tôi" component={MyClothesScreen} />
        </Tab.Navigator>
    );
};

export default ProfileTab;
