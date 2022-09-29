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
      console.log('JWT token: ' + jwt.accessToken);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        authenicated: jwt.accessToken !== null,
      });
    } catch (error) {
      console.log(`Keychain error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        authenicated: false,
      });
    }

    setLoading(false);
    if (authContext?.authState.authenicated) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Signin');
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JustJio</Text>
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
