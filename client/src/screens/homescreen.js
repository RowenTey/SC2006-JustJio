import React, {Component} from 'react';

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
  TextInput,
} from 'react-native';


const Temp = () => {
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

  export default Home;