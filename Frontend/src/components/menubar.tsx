import { ReactNode } from "react";
import {
	MagnifyingGlassIcon,
	UserGroupIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

function MenuItems({ icon, name }: { icon: ReactNode; name: string }) {
	return (
		<li>
			<a className="flex justify-center gap-2 text-white flex-col p-0 items-center">
				{icon}
				{name}
			</a>
		</li>
	);
}

export default function MenuBar() {
	return (
		<div className="fixed top-10 z-10 left-10 h-screen flex flex-col justify-center w-1/12">
			<ul className="menu h-2/5 flex bg-purple-btn justify-center rounded-full w-8/12">
				<div className="h-4/5 flex flex-col justify-between w-full">
					<MenuItems
						icon={<MagnifyingGlassIcon className="w-6 h-6" />}
						name="Search"
					/>
					<MenuItems
						icon={<UserGroupIcon className="h-6 w-6" />}
						name="Friends"
					/>
					<MenuItems icon={<UserIcon className="h-6 w-6" />} name="Trending" />
				</div>
			</ul>
		</div>
	);
}
