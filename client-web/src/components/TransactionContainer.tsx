import React from "react";

type TransactionContainerProps = {
	title: string;
	status: string;
};

const TransactionContainer: React.FC<TransactionContainerProps> = ({
	title,
	status,
}) => {
	return (
		<div className="flex flex-col w-[47.5%] min-h-[8rem] bg-white shadow-lg rounded-lg p-2">
			<h2 className="text-xs font-semibold text-gray-500">{title}</h2>
			<p className="text-sm font-medium text-gray-700">{status}</p>
		</div>
	);
};

export default TransactionContainer;
