import React from 'react';
import { View, StyleSheet,Button,Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation }) => {
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleRegister = () => {
    if (email.length < 1 || !email.includes('@')) {
      Alert.alert('Invalid email address');
    } else if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
    } else
    fetch('http://localhost:8080/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
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
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'orange',
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
      width: '80%',
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