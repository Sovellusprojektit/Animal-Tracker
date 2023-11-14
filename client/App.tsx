import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './utility/Navigation';

function App(): JSX.Element {

  return (
    <NavigationContainer >
      <Navigation/>
  </NavigationContainer>
  );
}

export default App;