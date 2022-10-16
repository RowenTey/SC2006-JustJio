import {
  CREATE_ROOM,
  END_LOADING,
  FETCH_ROOMS,
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
      state.rooms.push(payload);
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
