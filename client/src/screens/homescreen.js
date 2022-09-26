import React, {Component} from 'react';
import Signup from './src/screens/registration';
import Signin from './src/screens/login';
import Trans from './src/screens/transaction_hist';
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


const App = () => {
    return (
      <>
        <View style={Styles.container}>
      <TextInput style={Styles.text}>JustJio</TextInput>
      
        </View>
      </>
    );
  };


  const Styles = StyleSheet.create({

    text: {
        fontSize: 56,
        top: -40,
        fontFamily: 'OleoScript-Bold',
        color: '#4E1164',
      },


  })