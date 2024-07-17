/* eslint-disable react-hooks/exhaustive-deps */
import RoomTopBar from "../components/RoomTopBar";
import ButtonCard from "../components/ButtonCard";
import {
	ChatBubbleLeftIcon,
	PlusIcon,
	DocumentIcon,
	XMarkIcon,
	QrCodeIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import PeopleBox from "../components/PeopleBox";
import useLoadingAndError from "../hooks/useLoadingAndError";
import { useEffect, useRef, useState } from "react";
import Spinner from "../components/Spinner";
import { fetchRoomApi, fetchRoomAttendeesApi } from "../api/room";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { IRoom } from "../types/room";
import { useUserCtx } from "../context/user";
import { IUser } from "../types/user";
import { formatDate, toDayOfWeek } from "../utils/date";
import SearchableDropdown from "../components/SearchableDropdown";
import { useForm } from "react-hook-form";
import { useRoomCtx } from "../context/room";
import { channelTypes, useWs } from "../context/ws";

const RoomPage = () => {
	const { loading, startLoading, stopLoading } = useLoadingAndError();
	const [room, setRoom] = useState<IRoom | undefined>(undefined);
	const [attendees, setAttendees] = useState<IUser[]>([]);
	const [numNewMessages, setNumNewMessages] = useState<number>(0);
	const { roomId } = useParams();
	const { closeRoom } = useRoomCtx();
	const [subscribe, unsubscribe] = useWs();
	const { user } = useUserCtx();
	const navigate = useNavigate();

	const onCloseRoom = async () => {
		startLoading();
		const res = await closeRoom(Number(roomId));

		if (!res.isSuccessResponse) {
			console.error("Failed to close room", res.error);
			return;
		}

		stopLoading();
		console.log("Room closed successfully");
		navigate("/");
	};

	useEffect(() => {
		const fetchRoom = async (roomId: string) => {
			const res = await fetchRoomApi(api, roomId);
			setRoom(res.data.data);
		};
		const fetchAttendees = async (roomId: string) => {
			const res = await fetchRoomAttendeesApi(api, roomId);
			setAttendees(res.data.data);
		};

		// TODO: figure out how to handle this case
		if (!roomId) {
			console.error("No roomId provided");
			return;
		}

		startLoading();
		Promise.all([fetchRoom(roomId), fetchAttendees(roomId)]).then(stopLoading);
	}, []);

	useEffect(() => {
		if (!roomId) {
			console.error("No roomId provided");
			return;
		}

		const channel = channelTypes.createMessage();

		subscribe(channel, (message) => {
			console.log("Received message", message);
			setNumNewMessages((numNewMessages) => numNewMessages + 1);
		});

		return () => {
			unsubscribe(channel);
		};
	}, [roomId, subscribe, unsubscribe]);

	if (loading || room === undefined) {
		return <Spinner bgClass="bg-justjio-primary" />;
	}

	return (
		<div className="h-full flex flex-col items-center gap-4 bg-gray-200">
			<RoomTopBar title={room.name} shouldCenterTitle={true} />

			<RoomDetails room={room} />

			<RoomAttendees
				isHost={user.uid === room.host_id}
				attendees={attendees}
				hostId={room.host_id}
			/>

			<RoomActionWidgets
				isHost={user.uid === room.host_id}
				numNewMessages={numNewMessages}
				onCloseRoom={onCloseRoom}
				onChat={() => navigate(`/room/${roomId}/chat`)}
			/>
		</div>
	);
};

const RoomDetails: React.FC<{ room: IRoom }> = ({ room }) => {
	return (
		<div className="h-[25%] w-full px-5 flex flex-col gap-2">
			<h3 className="text-justjio-secondary font-bold">
				{new Date(room.date) > new Date() ? "Upcoming" : "Passed"} Event
			</h3>
			<div className="h-[90%] flex justify-between bg-white gap-6 rounded-lg px-3 py-2 leading-tight">
				<div className="w-2/5 flex flex-col gap-2 justify-center font-bold text-black">
					<div className="flex flex-col">
						<p>{toDayOfWeek(room.date)}</p>
						<p>{formatDate(room.date)}</p>
						<p>{room.time}</p>
					</div>
				</div>

				<div className="w-3/5 flex flex-col gap-2 font-bold justify-center">
					<div className="w-full py-2 px-3 bg-justjio-secondary rounded-xl text-white">
						<p>Venue: {room.venue}</p>
					</div>
					<div className="w-full py-2 px-3 bg-justjio-secondary rounded-xl text-white">
						<p>Attendees: {room.attendees_count}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const RoomAttendees: React.FC<{
	isHost: boolean;
	hostId: number;
	attendees: IUser[];
}> = ({ isHost, hostId, attendees }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = () => {
		setModalVisible(true);
	};
	const handleCloseModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<div className="h-[40%] w-full px-5 flex flex-col gap-2 mt-1">
				<div className="w-full flex justify-between items-center">
					<h3 className="text-justjio-secondary font-bold">Attendees</h3>

					{isHost && (
						<div
							className="flex items-center justify-center rounded-full bg-justjio-secondary p-1 w-8 h-8 cursor-pointer hover:border-2 hover:border-white hover:shadow-lg"
							onClick={handleOpenModal}
						>
							<PlusIcon className="h-7 w-7 text-white" />
						</div>
					)}
				</div>
				<div className="h-[90%] flex flex-col gap-2 p-2 rounded-xl bg-justjio-primary overflow-y-auto">
					{attendees.map((attendee) => (
						<PeopleBox
							key={attendee.id}
							name={attendee.username}
							isHost={attendee.id === hostId}
						/>
					))}
				</div>
			</div>

			<InviteAttendeesModal
				modalVisible={modalVisible}
				closeModal={handleCloseModal}
			/>
		</>
	);
};

const RoomActionWidgets: React.FC<{
	isHost: boolean;
	numNewMessages: number;
	onChat: () => void;
	onCloseRoom: () => void;
}> = ({ isHost, numNewMessages, onChat, onCloseRoom }) => {
	return (
		<div className="w-full mt-3 h-[10%] flex justify-evenly items-baseline">
			<ButtonCard title="Split Bill" Icon={DocumentIcon} onClick={() => {}} />
			<ButtonCard
				title="Chat"
				Icon={ChatBubbleLeftIcon}
				numNotifications={numNewMessages}
				onClick={onChat}
			/>
			<ButtonCard title="Generate QR" Icon={QrCodeIcon} onClick={() => {}} />
			{isHost ? (
				<ButtonCard title="Close Room" Icon={XMarkIcon} onClick={onCloseRoom} />
			) : (
				<ButtonCard
					title="Leave Room"
					Icon={ArrowRightStartOnRectangleIcon}
					onClick={() => {}}
				/>
			)}
		</div>
	);
};

type InviteAttendeesFormData = {
	invitees: string;
};

const InviteAttendeesModal: React.FC<{
	modalVisible: boolean;
	closeModal: () => void;
}> = ({ modalVisible, closeModal }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InviteAttendeesFormData>();

	const modalContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// close modal on click outside
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalContentRef.current &&
				!modalContentRef.current.contains(event.target as Node)
			) {
				closeModal();
			}
		};

		if (modalVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [modalVisible, closeModal]);

	if (!modalVisible) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div
				ref={modalContentRef}
				className={`w-80 p-6 bg-gray-200 rounded-xl shadow-lg border-4 border-justjio-secondary flex flex-col gap-3 items-center justify-center`}
			>
				<h2 className={`text-3xl font-bold text-justjio-secondary`}>
					Invite People
				</h2>
				<form
					onSubmit={handleSubmit((data: InviteAttendeesFormData) => {
						console.log(data);
						closeModal();
					})}
					className="w-full flex flex-col items-center justify-center gap-3"
					id="invite-people-form"
				>
					<SearchableDropdown
						name="invitees"
						errors={errors}
						register={register}
						onSelect={(selected) => {
							console.log(selected);
							setValue(
								"invitees",
								selected.map((option) => option.value).join(",")
							);
						}}
						options={[
							{ label: "John Doe", value: "1" },
							{ label: "Jane Doe", value: "2" },
							{ label: "John Smith", value: "3" },
						]}
						validation={{ required: "Invitees are required" }}
					/>

					<button
						className={`w-32 py-2 mt-2 rounded-full text-black font-semibold bg-justjio-primary`}
						form="invite-people-form"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default RoomPage;
