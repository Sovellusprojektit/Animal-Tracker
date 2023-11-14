import React from 'react';
import { View, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { IP_ADDRESS } from '@env'
import customBackgroundImage from '../utility/images/white_theme_bg.jpg';

const RegisterScreen = ({ navigation }) => {
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const role = 'USER';

  const handleRegister = async () => {
    if (email.length < 1 || !email.includes('@')) {
      Alert.alert('Invalid email address');
    } else if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
    } else {
      try {
        const data = {
          fname: fname,
          lname: lname,
          password: password,
          email: email,
          role: role,
        };
        const response = await axios.post(`http://${IP_ADDRESS}:8080/auth/signUp`, data, {
          headers: {
            'Content-Type': 'application/json', // Varmista, että lähetät JSON-dataa
          },
        });
  
        if (response.status === 200) {
          console.log('Response:', response.data);
          Alert.alert('User registered');
          navigation.navigate('Login');
        } else {
          console.log('Error:', response);
          Alert.alert('Error registering user');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error registering user');
      }
    }
  };

  return (
    <ImageBackground source={customBackgroundImage} style={styles.container}>
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="First name"
        onChangeText={(text) => setFname(text)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Last name"
        onChangeText={(text) => setLname(text)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <View style={styles.buttonstyle}>
        <Button
          title="Register"
          onPress={handleRegister}
          color="black"
        />
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 10,
  },
});

export default RegisterScreen;