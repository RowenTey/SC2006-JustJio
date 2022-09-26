import React, {Component, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Signin = ({value, setvalue}) =>{

  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  const buttonPressed = () => {
    console.warn('Signing in')
  }

  return (
    <View style={Styles.container}>
      <TextInput style={Styles.text}>JustJio</TextInput>
      
      
      <TextInput style = {Styles.box} placeholder = "Enter Username" placeholderTextColor={ '#4E1164'} secureTextEntry = {false}
      value = {value}
      >
        
      </TextInput>

      <TextInput style = {Styles.box} placeholder = "Enter password" placeholderTextColor={ '#4E1164'} secureTextEntry = {true}
      value = {value}
      >
        
      </TextInput>

      <TouchableOpacity>
        <Text style={Styles.confirmationbox} onPress= {buttonPressed}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={Styles.minibold}>Forgot password</Text>
      </TouchableOpacity>
      
      <View style={Styles.smalltext}>
        <Text style={Styles.signin}>Dont have an account?</Text>
        <TouchableOpacity>
        <Text style={Styles.signin}> Sign up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
export default Signin



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
    marginVertical: 10,
    color: '#6C6C6B',
    fontSize: 13,
    paddingHorizontal: 16,
    bottom: -120,
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
