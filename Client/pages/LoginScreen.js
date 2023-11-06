import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'Column',
      alignItems: 'center',
      justifyContent:"center",
    },
  });
export default LoginScreen;
