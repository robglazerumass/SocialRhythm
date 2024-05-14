import { ReactNode } from "react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";

interface MenuBarProps {
	icon: ReactNode;
	name: string;
	linkTo: string;
	username: string;
}

function MenuItems({ icon, name, linkTo, username }: MenuBarProps) {
	return (
		<button className="m-0 p-0 bg-transparent">
			<Link to={`../${linkTo}`} state={{ username: username }}>
				<a className="flex justify-center gap-2 text-white flex-col p-0 items-center">
					{icon}
					{name}
				</a>
			</Link>
		</button>
	);
}

export default function MenuBar({ username }: { username: string }) {
	// const { state } = useLocation();
	// const { username } = state;
	console.log("username ", username);
	return (
		<div className="fixed z-10 left-10 h-screen flex flex-col justify-center w-1/12">
			<ul className="menu h-2/5 flex bg-purple-btn justify-center rounded-full w-8/12 shadow-lg shadow-black">
				<div className="h-4/5 flex flex-col justify-between w-full">
					<SearchModal />
					<MenuItems
						icon={<HomeIcon className="w-6 h-6" />}
						name="Feed"
						linkTo="feed"
						username={username}
					/>
					<MenuItems
						icon={<UserCircleIcon className="h-6 w-6" />}
						name="Friends"
						linkTo="feed"
						username={username}
					/>
				</div>
			</ul>
		</div>
	);
}
