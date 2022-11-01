/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/auth';
import Spinner from '../components/Spinner';

const Splash = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const loadJWT = useCallback(async () => {
    setLoading(true);
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);
      console.log('JWT token: ' + jwt.token);

      if (jwt.token) {
        authContext.setAuthState({
          accessToken: jwt.token,
          authenticated: true,
        });
      }
    } catch (error) {
      console.log(`Keychain error: ${error?.message}`);
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }

    console.log('AuthState: ' + JSON.stringify(authContext.authState));
    setLoading(false);
    if (authContext?.authState.authenticated === true) {
      navigation.navigate('HomeTab');
    } else {
      navigation.navigate('Signin');
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => loadJWT()}>
        JustJio
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  text: {
    fontSize: 80,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },
});
