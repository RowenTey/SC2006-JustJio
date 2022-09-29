/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { AuthProvider } from './src/context/auth';
import { AxiosProvider } from './src/context/axios';

const Root = () => (
  <AuthProvider>
    <AxiosProvider>
      <App />
    </AxiosProvider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);
