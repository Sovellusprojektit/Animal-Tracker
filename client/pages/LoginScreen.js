import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useTheme } from '../utility/Theme';
import { handleLogin } from '../utility/Auth';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const { themeColors, backgroundImages } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLoginAndNavigate = async () => {
    try {
      const loginSuccess = await handleLogin(email, password);
  
      if (loginSuccess) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        );
      } else {
        console.log('Login unsuccessful');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImages.backgroundImage} style={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.animalTrackertitleText, { color: themeColors.textColor }]}>
          Animal Tracker
        </Text>
        <Text style={[styles.welcometitleText, { color: themeColors.textColor }]}>Welcome</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputField, { borderBottomColor: themeColors.textColor }]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={themeColors.textColor}
            color={themeColors.textColor}

          />
          <TextInput
            style={[styles.inputField, { borderBottomColor: themeColors.textColor }]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={themeColors.textColor}
            color={themeColors.textColor}

          />
        </View>
        <View style={styles.logInButtonContainer}>
          <TouchableOpacity
            style={[styles.logIncustomButton, { backgroundColor: themeColors.backgroundColor }]}
            onPress={handleLoginAndNavigate}
          >
            <Text style={[styles.frgPasswbuttonText, { color: themeColors.textColor }]}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={[styles.signUpcustomButton, { backgroundColor: themeColors.backgroundColor }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.signUpbuttonText, { color: themeColors.textColor }]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.frgPasswcustomButton, { backgroundColor: themeColors.backgroundColor }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.frgPasswbuttonText, { color: themeColors.textColor }]}>
              Forgot Password?
            </Text>
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
    fontWeight: 'bold',
    marginTop: 80,
  },
  welcometitleText: {
    fontSize: 24,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 60,
  },
  logInbuttonText: {
    fontSize: 20,
  },
  ButtonContainer: {
    marginBottom: 60,
  },
  signUpcustomButton: {
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  signUpbuttonText: {
    fontSize: 18,
  },
  frgPasswcustomButton: {
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  frgPasswbuttonText: {
    fontSize: 18,
  },
});

export default LoginScreen;