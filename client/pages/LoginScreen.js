import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import customBackgroundImage from '../utility/images/white_theme_bg.jpg';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={customBackgroundImage} style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.animalTrackertitleText}>Animal Tracker</Text>
      <Text style={styles.welcometitleText}>Welcome</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.logInButtonContainer}>
        <TouchableOpacity
          style={styles.logIncustomButton}
          onPress={() => navigation.navigate('HomePage')} //Alustava navigointi ennen kotisivua!
        >
          <Text style={styles.frgPasswbuttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.signUpcustomButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.signUpbuttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.frgPasswcustomButton}
          onPress={() => navigation.navigate('Register')} //Alustava navigointi ennen unohditko salasana sivua!
        >
          <Text style={styles.frgPasswbuttonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animalTrackertitleText: {
    fontSize: 34,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 80,
  },
  welcometitleText: {
    fontSize: 24,
    color: 'black',
  },
  inputContainer: {
    marginTop: 80,
  },
  inputField: {
    width: 250,
    height: 35,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  logInButtonContainer: {
    marginTop: 50,
  },
  logIncustomButton: {
    width: 320,
    height: 45,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 60,
  },
  logInbuttonText: {
    color: 'white',
    fontSize: 20,
  },
  ButtonContainer: {
    marginBottom: 60,
  },
  signUpcustomButton: {
    width: 250,
    height: 35,
    backgroundColor: '#2A9AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  signUpbuttonText: {
    color: 'white',
    fontSize: 18,
  },
  frgPasswcustomButton: {
    width: 250,
    height: 35,
    backgroundColor: '#2A9AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  frgPasswbuttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;