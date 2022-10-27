/* eslint-disable eqeqeq */
import React, { createContext, useContext, useReducer } from 'react';
import {
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
  SETTLE_TRANSACTION,
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
      dispatch({
        type: FETCH_TRANSACTION,
        payload: response,
      });
      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to fetch transactions', error);
      dispatch({
        type: END_LOADING,
      });
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const createTransactions = async (transactionData, roomId) => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const { data: response } = await authAxios.post(
        `/bills/${roomId}`,
        transactionData,
      );
      const responseTransactions = response.data.transactions;
      const responseBill = response.data.bill;
      const currentTransaction = [];
      for (let i = 0; i < responseTransactions.length; i++) {
        const entry = {
          transaction: responseTransactions[i],
          bill: responseBill,
        };
        currentTransaction.push(entry);
      }
      const updatedTransactions = [
        ...state.transactions,
        ...currentTransaction,
      ];
      dispatch({
        type: CREATE_TRANSACTION,
        payload: {
          transactions: updatedTransactions,
        },
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to split bill', error);
      dispatch({
        type: END_LOADING,
      });
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const payBill = async transactionData => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const response = await authAxios.patch('/bills/pay', transactionData);

      if (response.status === 200) {
        const updatedTransactions = state.transactions.map(
          ({ transaction }) => {
            if (
              transaction.payer == transactionData.payer &&
              transaction.payee == transactionData.payee &&
              transaction.billID == transactionData.billID
            ) {
              console.log('In the update block!');
              transaction = {
                ...transaction,
                isPaid: true,
                paidOn: transactionData.paidOn,
              };
              console.log('Updated transaction', transaction);
            }
            return transaction;
          },
        );
        console.log('Updated transactions', updatedTransactions);

        dispatch({
          type: SETTLE_TRANSACTION,
          payload: {
            transactions: updatedTransactions,
          },
        });
      }

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      dispatch({
        type: END_LOADING,
      });
      console.log('Failed to pay bill', error);
    }
  };

  const value = {
    total: state.total,
    transactions: state.transactions,
    isTransactionsLoading: state.isLoading,
    createTransactions,
    fetchTransactions,
    payBill,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { TransactionContext, TransactionProvider };
