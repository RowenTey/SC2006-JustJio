/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

// Screens
import Home from '../screens/Home';
import PartySnacks from '../screens/PartySnacks';
import PartyGames from '../screens/PartyGames';
import TransactionHistory from '../screens/TransactionHistory';

const Tab = createBottomTabNavigator();

// Screen names
function HomeScreen() {
  return {
    /* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')} />
    </View> */
  };
}

function Transactions({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          /* if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PartyGames') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'PartySnacks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Transaction') {
            iconName = focused ? 'list' : 'list-outline';
          } */

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
          return (
            <Image
              source={iconName}
              style={{
                width: 20,
                height: 20,
              }}
            />
          );
          // return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#E9D7FD',
        headerShown: false,
      })}
      initialRouteName={Home}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PartyGames" component={PartyGames} />
      <Tab.Screen name="PartySnacks" component={PartySnacks} />
      <Tab.Screen name="Transaction" component={TransactionHistory} />
    </Tab.Navigator>
  );
};

export default BottomTab;
