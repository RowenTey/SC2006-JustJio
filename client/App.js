/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Signup from './src/screens/Registration';
import Signin from './src/screens/Login';
import TransactionHistory from './src/screens/TransactionHistory';
import Home from './src/screens/Home';
import Navigation from './src/navigation';

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

const App = () => {
  return (
    // <>
    //   <View style={styles.container}>
    //     <Navigation />
    //   </View>
    // </>
    <Navigation />
  );
};

export default App;

// const styles = StyleSheet.create({
//   header: {
//     width: '100%',
//     height: '15%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E9D7FD',
//   },

//   head: {
//     backgroundColor: '#E9D7FD',
//   },

//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E9D7FD',
//   },

//   text: {
//     fontSize: 56,
//     fontFamily: 'OleoScript-Bold',
//     color: '#4E1164',
//   },
// });
