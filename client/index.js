import React from 'react';
<<<<<<< HEAD
import App from './src/App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
=======
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
>>>>>>> 34226c19dd787c180f03fef7162e245ad45e8cd8
import { AppContextProvider } from './src/context';

const Root = () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
