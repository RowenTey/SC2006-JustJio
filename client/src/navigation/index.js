import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Login';
import Signup from '../screens/Registration';
import Home from '../screens/Home';
import TransactionHistory from '../screens/TransactionHistory';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
