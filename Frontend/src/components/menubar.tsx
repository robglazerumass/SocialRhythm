import { ReactNode, useState } from "react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";

interface MenuBarProps {
	icon: ReactNode;
	name: string;
	linkTo: string;
	selected: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
}

function MenuItems({
	icon,
	name,
	linkTo,
	selected,
	setSelected,
}: MenuBarProps) {
	const isSelected = selected === name;
	return (
		<button
			className={`m-0 p-0 rounded-full h-16 w-16 ${
				isSelected ? `bg-white bg-opacity-30` : `bg-transparent`
			}`}
			onClick={() => {
				setSelected(name);
			}}>
			<a
				className="flex justify-center gap-2 text-white flex-col p-0 items-center"
				href={`../${linkTo}`}>
				{icon}
			</a>
		</button>
	);
}

export default function MenuBar() {
	const [selected, setSelected] = useState("Feed");
	const { state } = useLocation();
	const { username } = state;
	return (
		<div className="fixed z-10 left-10 h-screen flex flex-col justify-center w-1/12">
			<ul className="menu flex bg-primary bg-opacity-30 justify-center rounded-full w-8/12 shadow-lg shadow-black">
				<div className=" flex flex-col justify-between w-full gap-8">
					<SearchModal selected={selected} setSelected={setSelected} />
					<MenuItems
						icon={<HomeIcon className="w-6 h-6" />}
						name="Feed"
						linkTo="feed"
						selected={selected}
						setSelected={setSelected}
					/>
					<MenuItems
						icon={<UserCircleIcon className="h-6 w-6" />}
						name="Friends"
						linkTo="feed"
					/>
				</div>
			</ul>
		</div>
	);
}
