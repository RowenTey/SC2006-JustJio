/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { AuthProvider } from './src/context/auth';
import { AxiosProvider } from './src/context/axios';
import { RoomProvider } from './src/context/room';
import { UserProvider } from './src/context/user';

const Root = () => (
  <AuthProvider>
    <AxiosProvider>
      <UserProvider>
        <RoomProvider>
          <App />
        </RoomProvider>
      </UserProvider>
    </AxiosProvider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);
