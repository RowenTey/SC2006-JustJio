import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Login';
import Signup from '../screens/Registration';
import Splash from '../screens/Splash';
import CreateRoom from '../screens/CreateRoom';
import RoomsPage from '../screens/RoomsPage';
import HomeTab from './HomeTab';
import JoinRoom from '../screens/JoinRoom';
import GetSupermarkets from '../screens/GetSupermarkets';
import SplitBill from '../screens/SplitBill';
import SplitBillMembers from '../screens/SplitBillMembers';
import PartyGames from '../screens/PartyGames';
import BeerPong from '../screens/BeerPong';
import Charades from '../screens/Charades';
import CardsAgainstHumanity from '../screens/CardsAgainstHumanity';
import Mahjong from '../screens/Mahjong';
import HeadsUp from '../screens/HeadsUp';
import MusicalChairs from '../screens/MusicalChairs';
import Mafia from '../screens/Mafia';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PartyGames"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="RoomsPage" component={RoomsPage} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="SplitBill" component={SplitBill} />
        <Stack.Screen name="SplitBillMembers" component={SplitBillMembers} />
        <Stack.Screen name="GetSupermarkets" component={GetSupermarkets} />
        <Stack.Screen name="PartyGames" component={PartyGames} />
        <Stack.Screen name="BeerPong" component={BeerPong} />
        <Stack.Screen name="Charades" component={Charades} />
        <Stack.Screen
          name="CardsAgainstHumanity"
          component={CardsAgainstHumanity}
        />
        <Stack.Screen name="Mahjong" component={Mahjong} />
        <Stack.Screen name="HeadsUp" component={HeadsUp} />
        <Stack.Screen name="MusicalChairs" component={MusicalChairs} />
        <Stack.Screen name="Mafia" component={Mafia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
