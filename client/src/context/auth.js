import React, { createContext, useReducer, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { LOGOUT } from '../constants/actionTypes';
import RoomReducer from '../reducers/roomReducer';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const { dispatch } = useReducer(RoomReducer);
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
  });

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      dispatch({ type: LOGOUT });
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
