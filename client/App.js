/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Signup from './src/screens/registration';
import Signin from './src/screens/login';
import CreateRoom from './src/screens/CreateRoom';
import JoinRoom from './src/screens/JoinRoom';    //if doing new page, remember to update here as well
import TransactionHistory from './src/screens/TransactionHistory';
import Home from './src/screens/Home';
import RoomsPage from './src/screens/RoomsPage';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const App = () => {
  return (
    <>
      <View style={Styles.container}>
        <CreateRoom/> {/*//change this everytime when working on your page */}
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
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

export default App;
