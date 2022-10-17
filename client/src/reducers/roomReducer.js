import {
  CLOSE_ROOM,
  CREATE_ROOM,
  DECLINE_ROOM,
  END_LOADING,
  FETCH_ROOMS,
  JOIN_ROOM,
  LOGOUT,
  START_LOADING,
} from '../constants/actionTypes';

export const initialRoomState = {
  isLoading: false,
  total: 0,
  rooms: [],
};

const RoomReducer = (state, action) => {
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
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: payload.data,
        total: payload.data.length,
      };
    case CREATE_ROOM:
    case JOIN_ROOM:
    case CLOSE_ROOM:
      return {
        ...state,
        rooms: payload.rooms,
        total: payload.total,
      };
    case DECLINE_ROOM:
      return {
        ...state,
      };
    case LOGOUT:
      return initialRoomState;
    default:
      throw new Error(`No case for type ${type} found in RoomReducer.`);
  }
};

export default RoomReducer;
