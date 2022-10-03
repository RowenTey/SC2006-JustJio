import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Login';
import Signup from '../screens/Registration';
import Home from '../screens/Home';
import TransactionHistory from '../screens/TransactionHistory';
import Splash from '../screens/Splash';
import PartySnacks from '../screens/PartySnacks';
import CreateRoom from '../screens/CreateRoom';
import JoinRoom from '../screens/JoinRoom';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateRoom" //change this also when doing your page
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen
          name="PartySnacks"
          component={PartySnacks}
        />
        <Stack.Screen
          name="CreateRoom"    //as well as create additional screen page when starting your page.
          component={CreateRoom}
        />
        <Stack.Screen
          name="JoinRoom"
          component={JoinRoom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
