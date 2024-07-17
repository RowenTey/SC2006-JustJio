import { Link } from "react-router-dom";
import {
	HomeIcon as HomeSolid,
	UserIcon as UserSolid,
	VideoCameraIcon as VideoCameraSolid,
} from "@heroicons/react/24/solid";
import {
	HomeIcon as HomeOutline,
	UserIcon as UserOutline,
	VideoCameraIcon as VideoCameraOutline,
} from "@heroicons/react/24/outline";
import NavIcon from "../components/NavIcon";

const TabBar = () => {
	return (
		<nav className="h-[7.5%] p-2 bg-justjio-primary flex items-center justify-evenly">
			<Link to="/">
				<NavIcon to="/" SolidIcon={HomeSolid} OutlineIcon={HomeOutline} />
			</Link>
			<Link to="/upload">
				<NavIcon
					to="/upload"
					SolidIcon={VideoCameraSolid}
					OutlineIcon={VideoCameraOutline}
				/>
			</Link>
			<Link to="/profile">
				<NavIcon
					to="/profile"
					SolidIcon={UserSolid}
					OutlineIcon={UserOutline}
				/>
			</Link>
		</nav>
	);
};

export default TabBar;
