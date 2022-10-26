import React, { createContext, useContext, useReducer } from 'react';
import {
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
  END_TRANSACTION,
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
      console.log('currentTransaction', currentTransaction);
      const updatedTransactions = state.transactions.concat(currentTransaction);
      console.log('updatedTransactions', updatedTransactions);
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
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  // const payBill = async (transactionData, roomId) => {
  //   try {
  //     dispatch({
  //       type: START_LOADING,
  //     });

  //     await authAxios.patch(`/bills/${roomId}`, transactionData);
  //     console.log(transactionData);

  //     dispatch({
  //       type: END_TRANSACTION,
  //       payload: {
  //         transactions: transactions,
  //       },
  //     });

  //     dispatch({
  //       type: END_LOADING,
  //     });
  //   } catch (error) {
  //     console.log('Failed to pay bill', error);
  //     if (error.response) {
  //       console.log('Error response', error.response.data);
  //       if (error.response.data.message === "User doesn't exist") {
  //         throw new Error("User doesn't exist");
  //       }
  //     } else if (error.request) {
  //       console.log('Error request', error.request);
  //     }
  //   }
  // };

  const value = {
    total: state.total,
    transactions: state.transactions,
    isTransactionsLoading: state.isLoading,
    createTransactions,
    fetchTransactions,
    // payBill,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { TransactionContext, TransactionProvider };
