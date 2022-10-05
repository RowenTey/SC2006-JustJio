import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

// Screens
import Home from '../screens/Home';
import PartySnacks from '../screens/PartySnacks';
import PartyGames from '../screens/PartyGames';
import TransactionHistory from '../screens/TransactionHistory';

//Screen names


const Tab = createBottomTabNavigator();

import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';




function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')}/>

    </View>
  );
}

function Transactions({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}


export default function TabBar() {
  return (
    <NavigationContainer  >
      <Tab.Navigator 
          
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'PartyGames') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'PartySnacks'){
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Transaction'){
              iconName = focused ? 'list' : 'list-outline';
            }
              

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor : '#ffffff' ,
          tabBarInactiveBackgroundColor : '#E9D7FD',
          headerShown : false,
          
        })}
        initialRouteName = {Home}
        
        
      >
        <Tab.Screen name="Home" component={Home}  />
        <Tab.Screen name="PartyGames" component={PartyGames} />
        <Tab.Screen name="PartySnacks" component={PartySnacks} />
        <Tab.Screen name="Transaction" component={TransactionHistory} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}