import MenuBar from "../components/menubar";
import FeedImage from "../components/FeedImage";
import Interaction from "../components/Interaction";
import { Bars3Icon } from "@heroicons/react/16/solid";

export default function Feed() {
	return (
		<div>
			{/* <MenuBar /> */}
			{/* Add other components like title and description into the div below*/}
			<MenuBar />
			<div className="menu-icon fixed top-4 left-4">
				<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">
					<Bars3Icon className="h-6" />
					Menu
				</label>
			</div>
			<div className="temp-feed-view h-full overflow-y-scroll w-full flex flex-col items-center box-border">
				<FeedImage />
				<Interaction />
			</div>
		</div>
	);
}
