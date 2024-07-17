/* eslint-disable no-mixed-spaces-and-tabs */
import { BaseContextResponse } from ".";
import { BaseUserInfo } from "./user";

export interface IRoom {
	id: number;
	name: string;
	time: string;
	venue: string;
	date: string;
	host_id: number;
	host: BaseUserInfo;
	attendees_count: number;
	url: string;
	created_at: string;
	updated_at: string;
	is_closed: boolean;
}

export interface IRoomInvite {
	id: number;
	room_id: number;
	message: string;
	room: IRoom;
}

export interface RoomState {
	total: number;
	rooms: IRoom[];
}

export interface RoomContextType {
	total: number;
	rooms: Room[];
	fetchRooms: () => Promise<BaseContextResponse>;
	createRoom: (roomData: Partial<IRoom>) => Promise<BaseContextResponse>;
	respondToInvite: (
		roomId: number,
		accept: boolean
	) => Promise<BaseContextResponse>;
	closeRoom: (roomId: number) => Promise<BaseContextResponse>;
}

interface FetchRoomsPayload {
	data: IRoom[];
}

interface ModifyRoomsPayload {
	rooms: IRoom[];
	total: number;
}

type RoomActionTypes =
	| { type: "FETCH_ROOMS"; payload: FetchRoomsPayload }
	| {
			type: "CREATE_ROOM" | "JOIN_ROOM" | "CLOSE_ROOM";
			payload: ModifyRoomsPayload;
	  }
	| { type: "DECLINE_ROOM"; payload?: never }
	| { type: "LOGOUT"; payload?: never };
