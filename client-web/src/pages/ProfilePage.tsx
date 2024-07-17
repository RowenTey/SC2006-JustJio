import React from "react";

const ProfilePage: React.FC = () => {
	return (
		<div className="h-full flex flex-col items-center bg-gray-200">
			<ProfileTopBar />
			<ProfileContainer />
		</div>
	);
};

const ProfileTopBar: React.FC = () => {
	return (
		<div className="relative top-0 flex h-[8%] items-center justify-center w-full py-4 px-6 bg-purple-200">
			<h1 className="text-lg font-bold text-justjio-secondary">Profile</h1>
		</div>
	);
};

const ProfileContainer: React.FC = () => {
	return (
		<div className="w-full h-full flex flex-col gap-8 justify-center items-center">
			<img
				src="https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg"
				alt=""
				className="w-44 h-44 rounded-full"
			/>

			<div className="flex flex-col gap-2 justify-center items-center">
				<h1 className="text-2xl text-justjio-secondary font-bold">John Doe</h1>

				<p className="text-black leading-tight">Bio</p>
			</div>

			<div className="w-4/5 flex items-center justify-between gap-3">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Edit Profile
				</button>
				<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
					Settings
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
