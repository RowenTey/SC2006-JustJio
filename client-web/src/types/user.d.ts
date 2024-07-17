import React from "react";

export interface BaseUserInfo {
	uid: number;
	email: string;
	username: string;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	password: string;
	name?: string;
	phone_num: string;
	is_email_valid: boolean;
	is_online: boolean;
	last_seen: string;
	registered_at: string;
}

export type UserContextType = {
	user: BaseUserInfo;
	setUser: React.Dispatch<React.SetStateAction<BaseUserInfo>>;
};
