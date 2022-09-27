/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
<<<<<<< HEAD
import Signup from './src/screens/registration';
import Signin from './src/screens/login';
import Trans from './src/screens/transaction_hist';
import home from './src/screens/homescreen';
import type {Node} from 'react';
=======

import Signup from './src/screens/Registration';
import Signin from './src/screens/Login';
import TransactionHistory from './src/screens/TransactionHistory';
import Home from './src/screens/Home';

>>>>>>> 7e948834272848131dcf630bbc11c94064b967b9
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Home from './src/screens/homescreen';
import Navigation from './src/navigation';

const App = () => {
  return (
    <>
<<<<<<< HEAD
      <View style={Styles.container}>
        <Signin/>
=======
      <View style={styles.container}>
        <Home />
        {/* <TransactionHistory />
        <Signin />
        <Signup /> */}
>>>>>>> 7e948834272848131dcf630bbc11c94064b967b9
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  text: {
    fontSize: 56,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },
});
