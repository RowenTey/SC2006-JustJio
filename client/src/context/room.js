import React, { createContext, useContext, useReducer } from 'react';
import {
  CLOSE_ROOM,
  CREATE_ROOM,
  DECLINE_ROOM,
  END_LOADING,
  FETCH_ROOMS,
  JOIN_ROOM,
  START_LOADING,
} from '../constants/actionTypes';
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
        type: START_LOADING,
      });
      const { data: response } = await authAxios.get('/rooms');
      dispatch({
        type: FETCH_ROOMS,
        payload: response,
      });
      dispatch({
        type: END_LOADING,
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

  const createRoom = async roomData => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const { data: response } = await authAxios.post('/rooms', roomData);
      const updatedRooms = state.rooms.concat(response.data);
      const updatedTotal = updatedRooms.length;
      dispatch({
        type: CREATE_ROOM,
        payload: {
          rooms: updatedRooms,
          total: updatedTotal,
        },
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to create room', error);
      if (error.response) {
        console.log('Error response', error.response.data);
        if (error.response.data.message === "User doesn't exist") {
          throw new Error("User doesn't exist");
        }
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const joinRoom = async roomId => {
    try {
      dispatch({
        type: START_LOADING,
      });

      const { data: response } = await authAxios.patch(`/rooms/join/${roomId}`);
      console.log('joinRoom response', JSON.stringify(response.data.room));
      const updatedRooms = state.rooms.concat(response.data.room);
      const updatedTotal = updatedRooms.length;
      dispatch({
        type: JOIN_ROOM,
        payload: {
          rooms: updatedRooms,
          total: updatedTotal,
        },
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to join room', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const declineRoom = async roomId => {
    try {
      dispatch({
        type: START_LOADING,
      });

      await authAxios.delete(`/rooms/decline/${roomId}`);
      dispatch({
        type: DECLINE_ROOM,
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to decline room', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const closeRoom = async roomId => {
    try {
      dispatch({
        type: START_LOADING,
      });

      await authAxios.delete(`/rooms/${roomId}`);
      const updatedRooms = state.rooms.filter(room => room.ID !== roomId);
      const updatedTotal = updatedRooms.length;
      dispatch({
        type: CLOSE_ROOM,
        payload: {
          rooms: updatedRooms,
          total: updatedTotal,
        },
      });

      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log('Failed to close room', error);
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
    createRoom,
    joinRoom,
    declineRoom,
    closeRoom,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { RoomContext, RoomProvider };
