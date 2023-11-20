import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ImageBackground, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { IP_ADDRESS } from '@env'
import { useTheme } from '../utility/Theme';

const RegisterScreen = ({ navigation }) => {
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { themeColors, backgroundImages } = useTheme();

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
    <ImageBackground source={backgroundImages.backgroundImage} style={styles.container}>
    <View style={[styles.container, {color: themeColors.textColor}]} >
      <TextInput
        style={[styles.textInput, { borderColor: themeColors.textColor }]}
        placeholder="First name"
        onChangeText={(text) => setFname(text)}
        placeholderTextColor={themeColors.textColor}
        color={themeColors.textColor}

      ></TextInput>
      <TextInput
        style={[styles.textInput, { borderColor: themeColors.textColor }]}
        placeholder="Last name"
        onChangeText={(text) => setLname(text)}
        placeholderTextColor={themeColors.textColor}
        color={themeColors.textColor}

      ></TextInput>
      <TextInput
        style={[styles.textInput, { borderColor: themeColors.textColor }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={themeColors.textColor}
        color={themeColors.textColor}
      ></TextInput>
      <TextInput
        style={[styles.textInput, { borderColor: themeColors.textColor }]}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={themeColors.textColor}
        color={themeColors.textColor}

      ></TextInput>
      <View style={[styles.buttonstyle, { backgroundColor: themeColors.backgroundColor }]}>
      <TouchableOpacity
            style={[styles.buttonstyle, { backgroundColor: themeColors.backgroundColor }]}
            onPress={handleRegister}
          >
            <Text style={[styles.frgPasswbuttonText, { color: themeColors.textColor }]}>
              Register
            </Text>
          </TouchableOpacity>
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
    padding: 4,
  },
});

export default RegisterScreen;