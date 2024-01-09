// import React from 'react';
// import { View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import TabButton from './TabButton';

// const BottomTabBar = () => {
//     const navigation = useNavigation();

//     const navigateToScreen = (screenName) => {
//         navigation.navigate(screenName);
//     };

//     return (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16 }}>
//             <TabButton label="HomeTab" onPress={() => navigateToScreen('HomeTab')} />
//             <TabButton label="Search" onPress={() => navigateToScreen('Search')} />
//             <TabButton label="Post" onPress={() => navigateToScreen('Post')} />
//             <TabButton label="Notifications" onPress={() => navigateToScreen('Notifications')} />
//             <TabButton label="Profile" onPress={() => navigateToScreen('Profile')} />
//         </View>
//     );
// };

// export default BottomTabBar;
// BottomTabBar.js
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import the icons
import TabButton from './TabButton';

const BottomTabBar = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#99A1E8' }}>
            <TabButton
                icon={<FontAwesome name="home" size={24} color="black" />} // Use FontAwesome icon for Home

                onPress={() => navigateToScreen('HomeTab')}
            />
            <TabButton
                icon={<FontAwesome name="search" size={24} color="black" />} // Use FontAwesome icon for Search

                onPress={() => navigateToScreen('Search')}
            />
            <TabButton
                icon={<FontAwesome name="plus" size={24} color="black" />} // Use FontAwesome icon for Post
                onPress={() => navigateToScreen('Post')}
            />

            <TabButton
                icon={<FontAwesome name="bell" size={24} color="black" />} // Use FontAwesome icon for Notifications

                onPress={() => navigateToScreen('Notifications')}
            />
            <TabButton
                icon={<FontAwesome name="user" size={24} color="black" />} // Use FontAwesome icon for Profile

                onPress={() => navigateToScreen('Profile')}
            />
        </View>
    );
};

export default BottomTabBar;
