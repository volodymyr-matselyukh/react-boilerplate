import axios, { AxiosResponse } from "axios";
import { useMemo, useRef } from "react";

export default function useApiAgent() {
	const instance = useRef(
		axios.create({
			baseURL: 'http://localhost:3000',
		})
	);

	const responseBody = <T>(response: AxiosResponse<T>) => response.data;

	const requests = useMemo(() => ({
		get: <T>(url: string) => instance.current.get<T>(url).then(responseBody),
		post: <T>(url: string, body: {}) => instance.current.post<T>(url, body).then(responseBody),
		postWithCredentials: <T>(url: string, body: {}) => instance.current.post<T>(url, body, { withCredentials: true }).then(responseBody),
		put: <T>(url: string, body: {}) => instance.current.put<T>(url, body).then(responseBody),
		del: <T>(url: string) => instance.current.delete<T>(url).then(responseBody),
	}), []);

	return requests;
}
