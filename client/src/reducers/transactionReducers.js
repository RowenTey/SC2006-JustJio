import {
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
  LOGOUT,
  SETTLE_TRANSACTION,
} from '../constants/actionTypes';

export const initialTransactionState = {
  isLoading: false,
  transactions: [],
  paidTransactions: [],
  toPay: [],
  toGet: [],
};

const TransactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_TRANSACTION:
      return {
        ...state,
        transactions: payload.transactions,
        paidTransactions: payload.paidTransactions,
        toPay: payload.toPay,
        toGet: payload.toGet,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: payload.transactions,
        toGet: payload.toGet,
      };
    case SETTLE_TRANSACTION:
      return {
        ...state,
        transactions: payload.transactions,
        toPay: payload.toPay,
        paidTransactions: payload.paidTransactions,
      };
    case LOGOUT:
      return initialTransactionState;
    default:
      throw new Error(`No case for type ${type} found in Transaction reducer.`);
  }
};

export default TransactionReducer;
