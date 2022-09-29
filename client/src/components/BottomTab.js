import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import TransactionHistory from '../screens/TransactionHistory';
import { NavigationContainer } from '@react-navigation/native';

const TabBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="TransactionHistory" component={TransactionHistory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBar;
