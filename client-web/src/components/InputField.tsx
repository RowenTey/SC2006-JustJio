/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputFieldProps {
	label: string;
	name: string;
	type: string;
	placeholder: string;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	validation?: any;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type,
	placeholder,
	register,
	errors,
	validation,
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={name} className="text-justjio-secondary">
				{label}
			</label>
			<input
				type={type}
				id={name}
				placeholder={placeholder}
				className="bg-white text-black px-2 py-1 rounded-lg shadow-lg"
				{...register(name, validation)}
			/>
			{errors[name] && (
				<span className="text-red-600 text-wrap">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</div>
	);
};

export default InputField;
