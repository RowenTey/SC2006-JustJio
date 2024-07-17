import React from 'react';
import App from './src/App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { AppContextProvider } from './src/context';

const Root = () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
