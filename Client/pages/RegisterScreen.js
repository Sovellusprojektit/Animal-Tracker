import React from 'react';
import { View, StyleSheet,Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}placeholder='First name'></TextInput>
      <TextInput style={styles.textInput}placeholder='Last name'></TextInput>
      <TextInput style={styles.textInput}placeholder='Password'></TextInput>
      <TextInput style={styles.textInput}placeholder='Re-type password'></TextInput>
      <TextInput style={styles.textInput}placeholder='Email'></TextInput>
      <View style={styles.buttonstyle}>
         <Button title="Register"onPress={() => navigation.navigate('Login')}/>
    </View>
    </View>
  );
}

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
        borderRadius: 5,
        marginTop: 120,
        alignItems: 'center',    }
  });
  

export default RegisterScreen;
