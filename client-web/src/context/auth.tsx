import React, { createContext, useState } from "react";
import { AuthContextType, AuthState } from "../types";
import { loginApi } from "../api/auth";
import { api } from "../api";
import { initialUserState, useUserCtx } from "./user";
import useContextWrapper from "../hooks/useContextWrapper";

export const LOGOUT = "LOGOUT";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authState, setAuthState] = useState<AuthState>({
		accessToken: undefined,
		authenticated: false,
	});
	const { setUser } = useUserCtx();

	const login = async (username: string, password: string) => {
		let res = null;
		try {
			res = await loginApi(api, username, password, false);
			setAuthState({
				accessToken: res.data.token,
				authenticated: true,
			});
			localStorage.setItem("accessToken", res.data.token);
			setUser({
				uid: res.data.data.id,
				email: res.data.data.email,
				username: res.data.data.username,
			});
		} catch (error) {
			console.error(error);
			return { isSuccessResponse: false, data: null, error: error };
		}

		return { isSuccessResponse: true, data: res.data, error: null };
	};

	const logout = async () => {
		return new Promise<boolean>((resolve) => {
			setTimeout(() => {
				setAuthState({
					accessToken: undefined,
					authenticated: false,
				});
				localStorage.removeItem("accessToken");
				setUser(initialUserState);
				resolve(true);
			}, 1000);
		});
	};

	const getAccessToken = () => {
		return authState.accessToken;
	};

	const isAuthenticated = () => {
		return authState.authenticated;
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				getAccessToken,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContextWrapper(AuthContext);

export { useAuth, AuthProvider };
