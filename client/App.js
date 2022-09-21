import React from 'react';
import Signup from './src/screens/registration';
// import Signin from './src/screens/login';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <>
      <View style={Styles.container}>
        {/* <Signin /> */}
        <Signup />
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
