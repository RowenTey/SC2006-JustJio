import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
	// Get the initial value from localStorage or use the provided initial value
	const getInitialValue = () => {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			try {
				return JSON.parse(storedValue) as T;
			} catch (error) {
				console.error("Error parsing localStorage value", error);
			}
		}
		return initialValue;
	};

	const [storedValue, setStoredValue] = useState<T>(getInitialValue);

	const setValue = (value: T | ((prevValue: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error("Error setting localStorage value", error);
		}
	};

	const removeValue = () => {
		try {
			localStorage.removeItem(key);
			setStoredValue(initialValue);
		} catch (error) {
			console.error("Error removing localStorage value", error);
		}
	};

	return [storedValue, setValue, removeValue] as const;
};

export default useLocalStorage;
