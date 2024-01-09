
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationTab = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.activityText}>
                    <Text style={styles.boldText}>Huy </Text> đã bình luận bài viết : “Well !”
                </Text>
                <View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.activityText}>
                    <Text style={styles.boldText}>Hùng</Text>  vừa mới đăng bài viết mới hãy cũng vào xem nhé !
                </Text>
                <View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.activityText}>
                    <Text style={styles.boldText}> Nguyen Huu Phuc</Text>  đã theo dõi bạn
                </Text>
                <View style={styles.hr} />
            </View>
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
