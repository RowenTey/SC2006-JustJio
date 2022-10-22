import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from '../screens/Home';
import PartyGames from '../screens/PartyGames';
import TransactionHistory from '../screens/TransactionHistory';
import GetSupermarkets from '../screens/PartySnacks';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = require('../../assets/images/home.png');
          } else if (route.name === 'PartyGames') {
            iconName = require('../../assets/images/controller.png');
          } else if (route.name === 'PartySnacks') {
            iconName = require('../../assets/images/burger.png');
          } else if (route.name === 'Transaction') {
            iconName = require('../../assets/images/transaction.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#E9D7FD',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
      initialRouteName={Home}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PartyGames" component={PartyGames} />
      <Tab.Screen name="PartySnacks" component={GetSupermarkets} />
      <Tab.Screen name="Transaction" component={TransactionHistory} />
    </Tab.Navigator>
  );
};

export default HomeTab;
