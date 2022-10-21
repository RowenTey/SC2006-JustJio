import {
 
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
} from '../constants/transactionActions';

export const initialTransactionState = {
    isLoading: false,
    total: 0,
    transactions: [],
  };
