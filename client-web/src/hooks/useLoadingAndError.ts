import { useState } from "react";

const useLoadingAndError = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);
	const setErrorMsg = (msg: string) => setError(msg);
	const clearError = () => setError(null);

	return {
		loading,
		error,
		startLoading,
		stopLoading,
		setErrorMsg,
		clearError,
	};
};

export default useLoadingAndError;
