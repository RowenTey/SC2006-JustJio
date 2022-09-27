import React, {Component, useState} from 'react';
import {useForm, Controller} from 'react-hook-form'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {useNavigation } from '@react-navigation/native'
const Signin = () =>{

  const {control , handleSubmit, formState:{errors}} = useForm();


  const LoginPressed = data => { // Function for backend to check if data is right then approve :)
    console.warn('Signing in')
    console.log(data) // Use the data to check 
  }

  
  console.log(errors)
  const SignupPressed = () =>{
    console.warn('SignUp page')
  }

  return (
    <View style={Styles.container}>
      <TextInput style={Styles.text}>JustJio</TextInput>
      
      

      <Controller 
        control={control}
        name = "Username"
        rules={{required : true}}
        render={({field : {value,onChange,onBlur} , fieldState : {error}}) =>
         (<TextInput style = {[Styles.box, { borderColor: error ? 'red' :'white'}]} value = {value} onChangeText= {onChange} onBlur = {onBlur} placeholder = "Enter your Username" placeholderTextColor={ '#4E1164'} secureTextEntry={false}/>)}
      
      
      />
      
      <Controller
      control = {control}
      name = "Password"
      rules={{required : true}}
      render={({field : {value,onChange,onBlur}, fieldState : {error}}) =>
      (<TextInput style = {[Styles.box, {borderColor: error ? 'red' : 'white' }]} value = {value} onChangeText= {onChange} onBlur = {onBlur} placeholder = "Enter your password" placeholderTextColor={ '#4E1164'} secureTextEntry={true}/>)}
      
      
      />
      

      <TouchableOpacity>
        <Text style={Styles.confirmationbox} onPress= {handleSubmit(LoginPressed)}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={Styles.minibold}>Forgot password</Text>
      </TouchableOpacity>
      
      <View style={Styles.smalltext}>
        <Text style={Styles.signin}>Dont have an account?</Text>
        <TouchableOpacity>
        <Text style={Styles.signin} onPress = {SignupPressed}> Sign up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
export  default Signin;



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
    top: -40,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },

  smalltext: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
    bottom: -160,
  },

  box: {
    width: 300,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginVertical: 20,
    color: '#6C6C6B',
    fontSize: 13,
    paddingHorizontal: 16,
    borderWidth : 1,
    borderColor : 'white',
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
    bottom: -160,
  },

  signin: {
    color: '#4E1164',
    fontsize: 16,
    fontweight: '500',
  },

  minibold: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
    fontWeight: 'bold',
    bottom: -60,
  },
});
