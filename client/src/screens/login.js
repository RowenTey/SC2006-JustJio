import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Signin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>JustJio</Text>
      <TextInput
        style={styles.box}
        placeholder="Enter your username"
        placeholderTextColor={'#4E1164'}
      />
      <TextInput
        style={styles.box}
        placeholder="Enter password"
        placeholderTextColor={'#4E1164'}
        secureTextEntry={true}
      />
      <Text style={styles.minibold}>Forgot password</Text>
      <TouchableOpacity>
        <Text style={styles.confirmationbox}>Login</Text>
      </TouchableOpacity>
      <View style={styles.smalltext}>
        <Text style={styles.signin}>Dont have an account?</Text>
        <Text style={styles.signin}> Sign up</Text>
      </View>
    </View>
  );
};

export default Signin;

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
    bottom: -150,
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
    bottom: -135,
  },
});
