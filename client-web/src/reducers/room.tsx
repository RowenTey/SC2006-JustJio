// RoomReducer.ts

import { LOGOUT } from "../context/auth";
import {
	CLOSE_ROOM,
	CREATE_ROOM,
	DECLINE_ROOM,
	FETCH_ROOMS,
	JOIN_ROOM,
} from "../context/room";
import { RoomActionTypes, RoomState } from "../types/room";

export const initialRoomState: RoomState = {
	total: 0,
	rooms: [],
};

const RoomReducer = (state: RoomState, action: RoomActionTypes): RoomState => {
	const { type, payload } = action;

	switch (type) {
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
