// TabButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const TabButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
            {icon}

        </TouchableOpacity>
    );
};

export default TabButton;
