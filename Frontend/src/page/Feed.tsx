import FeedImage from "../components/FeedImage";
import Interaction from "../components/Interaction";

function Post() {
	return (
		<div className="temp-feed-view h-full overflow-y-scroll w-full flex flex-col items-center box-border">
			<FeedImage />
			<Interaction />
		</div>
	);
}

export default function Feed() {
	return (
		<div>
			{/* <MenuBar /> */}
			{/* Add other components like title and description into the div below*/}
			<Post />
		</div>
	);
}
