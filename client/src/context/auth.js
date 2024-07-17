import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
  });

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      setAuthState({
        accessToken: null,
        authenticated: false,
      });
    } catch (error) {
      console.log('Error logging out ' + error);
    }
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getAuthenticated = () => {
    return authState.authenticated;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        getAccessToken,
        getAuthenticated,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
