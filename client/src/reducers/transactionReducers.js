import {
 
  END_LOADING,
  FETCH_TRANSACTION,
  CREATE_TRANSACTION,
  START_LOADING,
} from '../constants/actionTypes';

export const initialTransactionState = {
    isLoading: false,
    total: 0,
    transactions: [],
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
            transactions: payload.data,
            total: payload.data.length,
          };

        case CREATE_TRANSACTION:
            return {
                ...state,
                transactions: payload.rooms,
                total: payload.total,
              };
        case LOGOUT:
                return initialTransactionState;
        default:
                throw new Error(`No case for type ${type} found in Transaction reducer.`);
        }
}

export default TransactionReducer;