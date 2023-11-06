import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../pages/RegisterScreen';
import LoginScreen from '../pages/LoginScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;