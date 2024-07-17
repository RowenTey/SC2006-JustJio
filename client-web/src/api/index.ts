import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8080/v1",
});

api.interceptors.request.use((req) => {
	const token = localStorage.getItem("accessToken");
	if (token !== null) {
		// console.log("Token for request headers " + token);
		req.headers.Authorization = `Bearer ${token}`;
	}

	return req;
});

export interface ApiResponse {
	data: object;
	message: string;
	status: string;
}
