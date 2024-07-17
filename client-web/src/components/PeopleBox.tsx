interface PeopleBoxProps {
	name: string;
	isHost: boolean;
}

const PeopleBox: React.FC<PeopleBoxProps> = ({ name, isHost }) => {
	return (
		<div className="flex gap-3 p-2 bg-white rounded-2xl">
			<img
				src="https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg"
				alt=""
				className="w-7 h-7 rounded-full"
			/>
			<span className="text-black font-bold">{name}</span>
			{isHost && <span className="text-black ml-auto mr-2 italic">Host</span>}
		</div>
	);
};

export default PeopleBox;
