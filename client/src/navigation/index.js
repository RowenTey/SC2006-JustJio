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
import RoomsPage from '../screens/RoomsPage';
import BottomTab from '../components/BottomTab';
// import JoinRoom from '../screens/JoinRoom';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeTab" component={BottomTab} />
        <Stack.Screen name="PartySnacks" component={PartySnacks} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="RoomsPage" component={RoomsPage} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        {/* <Stack.Screen name="JoinRoom" component={JoinRoom} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
