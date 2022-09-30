import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1, //flexible grows horizontally or vertically for the screen
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E9D7FD',
    },
  
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
  
    text: {
      fontSize: 56,
      top: -40,
      fontFamily: 'OleoScript-Bold',
      color: '#4E1164',
    },
  
    smalltext: {
      fontSize: 13,
      color: '#4E1164',
      flexDirection: 'row',
      bottom: -110,
    },
  
    box: {
      width: 300,
      justifyContent: 'flex-end',
      backgroundColor: 'white',
      marginVertical: 20,
      color: '#6C6C6B',
      fontSize: 13,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: 'white',
    },
  
    confirmationbox: {
      borderRadius: 25,
      width: 300,
      height: 40,
      paddingVertical: 10,
      backgroundColor: '#4E1164',
      marginVertical: 10,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 13,
      alignItems: 'center',
      textAlign: 'center',
      bottom: -90,
    },
  
    signup: {
      color: '#4E1164',
      fontsize: 16,
      fontweight: '500',
    },
  
    signupLink: {
      color: '#4E1164',
      fontsize: 16,
      textDecorationLine: 'underline',
      fontWeight: '700',
    },
  
    minibold: {
      fontSize: 13,
      color: '#4E1164',
      flexDirection: 'row',
      fontWeight: 'bold',
      bottom: -100,
    },
  });
