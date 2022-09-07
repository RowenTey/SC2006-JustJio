/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Login from './login';
import type {Node} from 'react';
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
      <View style = {Styles.container}>
        <Login/>
      </View>

      
    </>






  )
















}


const Styles = StyleSheet.create({
  header: {
    width : '100%' ,
    height : '15%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#E9D7FD'

  },

  head : {
    backgroundColor : '#E9D7FD',
  },

  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#E9D7FD'
  },

  text: {
    fontSize : 80,
   // changed from 56 to 80 on fontsize
    fontFamily : "OleoScript-Bold",
    color : "#4E1164",
    
  }
});



export default App;