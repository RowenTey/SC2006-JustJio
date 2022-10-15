import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import RoomReducer, { initialRoomState } from '../reducers/roomReducer';
import { AxiosContext } from './axios';

const RoomContext = createContext(null);
const { Provider } = RoomContext;

const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomReducer, initialRoomState);
  const { authAxios } = useContext(AxiosContext);

  const fetchRooms = async () => {
    try {
      dispatch({
        type: 'START_LOADING',
      });
      const { data: response } = await authAxios.get('/rooms');
      dispatch({
        type: 'FETCH_ROOMS',
        payload: response,
      });
      dispatch({
        type: 'STOP_LOADING',
      });
    } catch (error) {
      console.log('Failed to fetch rooms', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const value = {
    total: state.total,
    rooms: state.rooms,
    isLoading: state.isLoading,
    fetchRooms,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { RoomContext, RoomProvider };
