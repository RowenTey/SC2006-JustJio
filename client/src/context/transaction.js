import React, { createContext, useContext, useReducer } from 'react';
import {
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
} from '../constants/actionTypes';

import { AxiosContext } from './axios';
import TransactionReducer, {
  initialTransactionState,
} from '../reducers/transactionReducers';

const TransactionContext = createContext(null);
const { Provider } = TransactionContext;

const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    TransactionReducer,
    initialTransactionState,
  );
  const { authAxios } = useContext(AxiosContext);

  const fetchTransactions = async () => {
    try {
      dispatch({
        type: START_LOADING,
      });
      const { data: response } = await authAxios.get('/bills');
      console.log('Transactions fetched', response);
      dispatch({
        type: FETCH_TRANSACTION,
        payload: response,
      });
      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to fetch transactions', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const createTransactions = async transactionData => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const { data: response } = await authAxios.post(
        '/bills',
        transactionData,
      );
      const updatedTransactions = state.transactions.concat(response.data);
      const updatedTotal = updatedTransactions.length;
      dispatch({
        type: CREATE_TRANSACTION,
        payload: {
          transactions: updatedTransactions,
          total: updatedTotal,
        },
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to create transaction', error);
      if (error.response) {
        console.log('Error response', error.response.data);
        if (error.response.data.message === "User doesn't exist") {
          throw new Error("User doesn't exist");
        }
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const value = {
    total: state.total,
    transactions: state.transactions,
    isLoading: state.isLoading,
    createTransactions,
    fetchTransactions,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { TransactionContext, TransactionProvider };
