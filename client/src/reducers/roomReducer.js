export const initialRoomState = {
  isLoading: false,
  total: 0,
  rooms: [],
};

const RoomReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'FETCH_ROOMS':
      console.log('FETCH_ROOMS', payload);
      return {
        ...state,
        rooms: payload.data,
        total: payload.data.length,
      };
    case 'LOGOUT':
      return initialRoomState;
    default:
      throw new Error(`No case for type ${type} found in RoomReducer.`);
  }
};

export default RoomReducer;
