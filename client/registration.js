import React, { Component } from 'react';

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

  export default class Login extends Component<{}> {
    render(){
        return(
            <View style = {Styles.container}>
                <Text style = {Styles.text}>JustJio</Text>
                <TextInput style = {Styles.box} >Enter your username</TextInput>

                <TextInput style = {Styles.box} >Enter your phone number</TextInput>
                <TextInput style = {Styles.box} >Enter your email</TextInput>
                <TextInput style = {Styles.box} >Enter password</TextInput>
                <TextInput style = {Styles.box} >Confirm password</TextInput>
                <TextInput style = {Styles.confirmationbox} >Register</TextInput>
                <Text style = {Styles.smalltext}>Already have an account? Sign in</Text>
            </View>
        )
    }
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
      fontSize : 56,
      top : -40,
      fontFamily : "OleoScript-Bold",
      color : "#4E1164",
      
    },

    smalltext : {
      fontSize : 13,
      color : "#4E1164",
    },

    box : {
        width : 300,
        backgroundColor : "white",
        marginVertical : 10,
        color : '#6C6C6B',
        fontSize : 13,
        paddingHorizontal : 16,
       
    },

    confirmationbox : {
        borderRadius : 25,
        width : 300,
        backgroundColor : "#4E1164",
        marginVertical : 10,
        color : 'white',
        fontWeight : 'bold',
        fontSize : 13,
        alignItems : 'center',
        textAlign : 'center',
        marginVertical : 20,
    }

  });


  
  