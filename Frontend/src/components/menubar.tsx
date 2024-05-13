import { ReactNode } from "react";
import {
	HomeIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";

interface MenuBarProps {
	icon: ReactNode;
	name: string;
	linkTo: string;
}

function MenuItems({ icon, name, linkTo}: MenuBarProps) {
	return (
		<button className="m-0 p-0 bg-transparent">
			<a
				className="flex justify-center gap-2 text-white flex-col p-0 items-center"
				href={`../${linkTo}`}
			>
				{icon}
				{name}
			</a>
		</button>
	);
}

export default function MenuBar() {
	const { state } = useLocation();
	const { username } = state;
	return (
		<div className="fixed z-10 left-10 h-screen flex flex-col justify-center w-1/12">
			<ul className="menu h-2/5 flex bg-primary bg-opacity-30 justify-center rounded-full w-8/12 shadow-lg shadow-black">
				<div className="h-4/5 flex flex-col justify-between w-full">
				<SearchModal/>
					<MenuItems
						icon={<HomeIcon className="w-6 h-6" />}
						name="Feed"
						linkTo="feed"
					/>
					<MenuItems
						icon={<UserCircleIcon className="h-6 w-6" />}
						name="Profile"
						linkTo={`/user/${username}`}
					/>
				</div>
			</ul>
		</div>
	);
}
