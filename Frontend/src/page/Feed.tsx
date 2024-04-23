import MenuBar from "../components/menubar";
import FeedImage from "../components/FeedImage";
import Interaction from "../components/Interaction";
import { Bars3Icon } from "@heroicons/react/16/solid";
import MenuBar2 from "../components/MenuBar2";
import postMockData from "../mockData/postMockData";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Post({
	username,
	title,
	description,
	img,
}: {
	username: string;
	title: string;
	description: string;
	img: string;
}) {
	return (
		<div>
			<div className="top-half flex flex-col justify-center gap-5 px-40 py-5">
				<div className="flex flex-row gap-4">
					<div className="avatar">
						<div className="w-20 rounded">
							<img src={img} />
						</div>
					</div>
					<div className="min-h-full flex flex-col justify-center text-xl font-bold">
						<p>{username}</p>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<p className="font-extrabold text-3xl">{title}</p>
					<p>{description}</p>
				</div>
			</div>
			<div className="temp-feed-view h-full overflow-y-visible w-full flex flex-col items-center box-border">
				<FeedImage />
				<Interaction />
			</div>
		</div>
	);
}

export default function Feed() {
	const defaultUsername = "jane123";
	const defaultTitle = "OMG it's here!";
	const defaultImg =
		"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
	const defaultDesc = "I can't believe that it's here!";
	const [feedData, setFeedData] = useState(postMockData);
	const { state } = useLocation();
	const { userid } = state;
	useEffect(() => {
		async function fetchPosts() {
			const nextURL: string = `http://localhost:3000/api/feed?userId=${userid.account_info}&xPosts=3&pageNum=0`;
			const data = await axios.get(nextURL).then((res) => res.data);
			console.log(data);
			setFeedData(data);
		}
		fetchPosts();
	}, [userid]);
	return (
		<div className="flex flex-row min-h-screen min-w-screen">
			<MenuBar2 />
			{/* <MenuBar /> */}
			{/* Add other components like title and description into the div below*/}
			{/* <MenuBar />
			<div className="menu-icon fixed top-4 left-4">
				<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">
					<Bars3Icon className="h-6" />
					Menu
				</label>
			</div> */}
			<div className="flex flex-col justify-center">
				<Post
					username={defaultUsername}
					title={defaultTitle}
					description={defaultDesc}
					img={defaultImg}
				/>
				{feedData.map((post) => (
					<Post
						key={post.username}
						username={post.username}
						title={post.title}
						description={post.description}
						img={post.image_url}
					/>
				))}
			</div>
		</div>
	);
}
