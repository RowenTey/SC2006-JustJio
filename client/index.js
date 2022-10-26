/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { AppContextProvider } from './src/context';

const Root = () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
