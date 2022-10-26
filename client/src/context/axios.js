import React, { createContext, useContext } from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import { AuthContext } from './auth';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: `https://justjio-server-o44bmvzlsa-as.a.run.app`,
  });

  const publicAxios = axios.create({
    baseURL: `https://justjio-server-o44bmvzlsa-as.a.run.app`,
  });

  if (authContext.getAuthenticated()) {
    authAxios.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
