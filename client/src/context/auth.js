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
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
