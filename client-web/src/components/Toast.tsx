import React, { useEffect } from "react";

type ToastProps = {
	message: string;
	visible: boolean;
	bgColor?: string;
	onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
	message,
	bgColor = "bg-justjio-secondary",
	visible,
	onClose,
}) => {
	useEffect(() => {
		if (visible) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [visible, onClose]);

	return (
		<div
			className={`fixed top-4 left-[31.5%] transform -translate-x-1/2 px-4 py-2 ${bgColor} text-white rounded shadow-lg transition-transform duration-300 ${
				visible ? "toast-show" : "toast-hide"
			}`}
		>
			{message}
		</div>
	);
};

export default Toast;
