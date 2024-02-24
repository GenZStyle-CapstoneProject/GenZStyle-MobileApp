
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const NotificationTab = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://genzstyleappapi20240126141439.azurewebsites.net/odata/Notification');
                setNotifications(response.data.value);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {notifications.map(notification => (
                <View key={notification.NotificationId}>
                    <Text style={styles.activityText}>
                        <Text style={styles.boldText}>{notification.Message} </Text>

                    </Text>
                    <View style={styles.hr} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    activityText: {
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold',
    },
    hr: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});

export default NotificationTab;