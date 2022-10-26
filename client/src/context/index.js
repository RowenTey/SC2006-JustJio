import React from 'react';
import { AuthProvider } from './auth';
import { AxiosProvider } from './axios';
import { RoomProvider } from './room';
import { TransactionProvider } from './transaction';
import { UserProvider } from './user';

const combineComponents = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

const providers = [
  AuthProvider,
  AxiosProvider,
  UserProvider,
  RoomProvider,
  TransactionProvider,
];

export const AppContextProvider = combineComponents(...providers);
