import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Login';
import Signup from '../screens/Registration';
import Home from '../screens/Home';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen name="signin" component={Signin} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
