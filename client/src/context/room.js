/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth';
import { AxiosContext } from './axios';

const RoomContext = createContext(null);
const { Provider } = RoomContext;

const initialRoomState = {
  total: 0,
  rooms: [],
};

const RoomProvider = ({ children }) => {
  const [roomsState, setRoomsState] = useState(initialRoomState);
  const { authAxios } = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const fetchRooms = async () => {
    try {
      const { data: response } = await authAxios.get('/rooms');
      setRoomsState({
        total: response.data.length,
        rooms: response.data,
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

  useEffect(() => {
    if (authContext.getAuthenticated) {
      fetchRooms();
    }
  }, [authContext.getAuthenticated]);

  return <Provider value={[roomsState, setRoomsState]}>{children}</Provider>;
};

export { RoomContext, RoomProvider };
