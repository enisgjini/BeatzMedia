import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Dashboard = ({ username, logout }) => {
    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <Text style={styles.title}>Welcome</Text>
            </View>
            <View style={styles.borde}>
                
                <Text style={styles.username}>{'\n'}{username}!</Text>
            </View>
            {/* Your dashboard content */}
            <Button title="Logout" onPress={logout} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 5,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
    },
});

export default Dashboard;
