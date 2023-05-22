import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import Dashboard from './Dashboard.js';

export default class LoginPage extends Component {
    state = {
        username: "",
        password: "",
        isLoggedIn: false,
    };

    handleLogin = () => {
        const { username, password } = this.state;

        fetch('http://localhost:1348/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({ isLoggedIn: true });
                } else {
                    alert("Invalid username or password");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred during login");
            });
    };

    render() {
        const { username, password, isLoggedIn } = this.state;

        if (isLoggedIn) {
            return <Dashboard />;
        }

        return (
            <View style={styles.container}>
                <Image source={require('./images/favicon.png')} style={styles.logo} />
                <Text style={styles.title}>BeatzMedia</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={text => this.setState({ username: username })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                />
                <Button title="Login" onPress={this.handleLogin} style={styles.button} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
    },
});
