import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/Dashboard.js';
import YoutubeReports from './screens/YoutubeReports.js';
import Platforms from './screens/Platforms.js';
import { AiOutlineLike, FaYoutube, FiShare2 } from 'react-icons/all';


const Tab = createBottomTabNavigator();

export default class App extends Component {
  state = {
    username: "",
    password: "",
    isLoggedIn: false,
  };

  handleLogin = () => {
    const { username, password } = this.state;
    fetch('http://localhost:1348/login', {

      // fetch('https://beatz-api-topaz.vercel.app/login', {
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
          this.setState({ isLoggedIn: true, username: username });
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred during login");
      });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      username: "",
      password: "",
    });
  };

  render() {
    const { isLoggedIn, username } = this.state;

    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Dashboard') {
                  return <AiOutlineLike color={color} size={size} />;
                } else if (route.name === 'YouTube Reports') {
                  return <FaYoutube color={color} size={size} />;
                } else if (route.name === 'Platforms') {
                  return <FiShare2 color={color} size={size} />;
                }
              },
            })}
          >
            <Tab.Screen name="Dashboard">
              {props => <Dashboard {...props} username={username} logout={this.handleLogout} />}
            </Tab.Screen>
            <Tab.Screen name="YouTube Reports">
              {props => <YoutubeReports {...props} username={username} />}
            </Tab.Screen>
            <Tab.Screen name="Platforms" component={Platforms} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={styles.container}>



        <Image source={require('./images/favicon.png')} style={styles.logo} />
        <Text style={styles.title}>BeatzMedia</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
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
    width: 50,
    height: 50,
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: 200,
    borderRadius: 5,
  },
});
