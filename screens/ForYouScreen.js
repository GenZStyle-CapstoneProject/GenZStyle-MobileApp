
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import CategoryForMen from '../components/CategoryForMen';
// import CategoryForWomen from '../components/CategoryForWomen';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const ForYouScreen = () => {
//     const [showGenderOptions, setShowGenderOptions] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [categoryButtonText, setCategoryButtonText] = useState('Category');

//     const navigateToMenCategory = () => {
//         setSelectedCategory('men');
//         setShowGenderOptions(false);
//         setCategoryButtonText('Nam');
//     };

//     const navigateToWomenCategory = () => {
//         setSelectedCategory('women');
//         setShowGenderOptions(false);
//         setCategoryButtonText('Nữ');
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <TouchableOpacity
//                 style={styles.categoryButton}
//                 onPress={() => setShowGenderOptions(!showGenderOptions)}
//             >
//                 <View style={styles.rowContainer}>
//                     <Text style={styles.categoryButtonText}>{categoryButtonText}</Text>
//                     <Icon name="chevron-down" size={30} color="black" />
//                 </View>
//             </TouchableOpacity>

//             {showGenderOptions && (
//                 <View style={styles.genderOptions}>
//                     <TouchableOpacity onPress={navigateToMenCategory}>
//                         <Text style={styles.genderOptionText}>Nam</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={navigateToWomenCategory}>
//                         <Text style={styles.genderOptionText}>Nữ</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             {selectedCategory === 'men' && <CategoryForMen />}
//             {selectedCategory === 'women' && <CategoryForWomen />}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     categoryButton: {
//         backgroundColor: 'white',
//         padding: 10,
//         alignSelf: 'center',
//         marginTop: 15,
//         alignSelf: 'flex-start',
//     },
//     categoryButtonText: {
//         color: 'black',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         fontSize: 30,
//         marginRight: 10,
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     genderOptions: {
//         padding: 10,
//         flexDirection: 'column',
//         alignItems: 'center',
//         alignSelf: 'flex-start',
//     },
//     genderOptionText: {
//         padding: 10,
//         fontSize: 18,
//         fontWeight: 'bold',
//         alignSelf: 'flex-start',
//     },
// });

// export default ForYouScreen;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryForMen from '../components/CategoryForMen';
import CategoryForWomen from '../components/CategoryForWomen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForYouScreen = () => {
    const [showGenderOptions, setShowGenderOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryButtonText, setCategoryButtonText] = useState('Category');

    const navigateToCategory = (category) => {
        setSelectedCategory(category);
        setShowGenderOptions(false);
        setCategoryButtonText(category);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setShowGenderOptions(!showGenderOptions)}
            >
                <View style={styles.rowContainer}>
                    <Text style={styles.categoryButtonText}>{categoryButtonText}</Text>
                    <Icon name="chevron-down" size={30} color="black" />
                </View>
            </TouchableOpacity>

            {showGenderOptions && (
                <View style={styles.genderOptions}>
                    <TouchableOpacity onPress={() => navigateToCategory('Nam')}>
                        <Text style={styles.genderOptionText}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToCategory('Nữ')}>
                        <Text style={styles.genderOptionText}>Nữ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToCategory('Tất cả')}>
                        <Text style={styles.genderOptionText}>Tất cả</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedCategory === 'Nam' && <CategoryForMen />}
            {selectedCategory === 'Nữ' && <CategoryForWomen />}
            {/* Handle other selectedCategory values if needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    categoryButtonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        marginRight: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderOptions: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    genderOptionText: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
});

export default ForYouScreen;
