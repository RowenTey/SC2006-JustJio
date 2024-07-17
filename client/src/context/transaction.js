/* eslint-disable no-unused-vars */
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
import { UserContext } from './user';
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
  const [user, setUser] = useContext(UserContext);

  const fetchTransactions = async () => {
    try {
      dispatch({
        type: START_LOADING,
      });
      const { data: response } = await authAxios.get('/bills');
      dispatch({
        type: FETCH_TRANSACTION,
        payload: {
          transactions: response.data ? response.data : [],
          toPay: response.data
            ? response.data.filter(
                item =>
                  item.transaction?.payer === user.username &&
                  !item.transaction?.isPaid,
              )
            : [],
          toGet: response.data
            ? response.data.filter(
                item =>
                  item.transaction?.payee === user.username &&
                  !item.transaction?.isPaid,
              )
            : [],
          paidTransactions: response.data
            ? response.data
                .filter(item => item.transaction?.isPaid)
                .sort((a, b) => (a.bill.date < b.bill.date ? 1 : -1))
            : [],
        },
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
      const updatedToGet = [...state.toGet, ...currentTransaction];
      dispatch({
        type: CREATE_TRANSACTION,
        payload: {
          transactions: updatedTransactions,
          toGet: updatedToGet,
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

  const payBill = async (transactionData, billId) => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const response = await authAxios.patch('/bills/pay', transactionData);
      if (response.status === 200) {
        const updatedTransactions = state.transactions.map(item => {
          if (
            item.transaction.payer == transactionData.payer &&
            item.transaction.payee == transactionData.payee &&
            item.transaction.billID == billId
          ) {
            return {
              ...item,
              transaction: {
                ID: item.transaction.ID,
                payer: item.transaction.payer,
                payee: item.transaction.payee,
                billID: item.transaction.billID,
                isPaid: true,
                paidOn: transactionData.paidOn,
              },
            };
          }
          return item;
        });

        const updatedToPay = state.toPay.filter(
          item => item.transaction.billID != billId,
        );

        const updatedPaidTransactions = updatedTransactions
          .filter(item => item.transaction.isPaid)
          .sort((a, b) => (a.bill.date < b.bill.date ? 1 : -1));

        dispatch({
          type: SETTLE_TRANSACTION,
          payload: {
            transactions: updatedTransactions,
            toPay: updatedToPay,
            paidTransactions: updatedPaidTransactions,
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
      console.log('Failed to pay bill', JSON.stringify(error));
    }
  };

  const value = {
    total: state.total,
    transactions: state.transactions,
    paidTransactions: state.paidTransactions,
    toPay: state.toPay,
    toGet: state.toGet,
    isTransactionsLoading: state.isLoading,
    createTransactions,
    fetchTransactions,
    payBill,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { TransactionContext, TransactionProvider };
