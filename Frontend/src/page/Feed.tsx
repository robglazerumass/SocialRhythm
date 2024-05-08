import FeedImage from "../components/FeedImage";
import Interaction from "../components/Interaction";
import MenuBar2 from "../components/MenuBar2";
import postMockData from "../mockData/postMockData";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import createPostForm from "../components/createPostForm";

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
		<div className="post-content w-2/5 bg-primary bg-opacity-10 my-10 px-10 rounded-lg">
			<div className="top-half flex flex-col justify-center gap-5 py-5 w-full box-border">
				<div className="flex flex-row gap-4">
					<div className="avatar">
						<div className="w-12 rounded-full">
							<img src={img} />
						</div>
					</div>
					<div className="min-h-full flex flex-col justify-center text-xl font-bold">
						<p>{username}</p>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<p className="font-extrabold text-3xl">{title}</p>
					<p className="max-w-full flex flex-wrap">{description}</p>
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
	const defaultDesc =
		"I can't believe that it's here! ljdaskljfkldsajf;sdadsjf;sldajfkl;sdajfkdsjfklasdjflkjdsaklfjdsljfklsdajfklsdajfklsdjafk;ldsjfkl;sdjafkljsadfkljsdflkjsdalkfjklsdajflk;dsajf";
	const [feedData, setFeedData] = useState(postMockData);
	const { state } = useLocation();
	const { username } = state;
	useEffect(() => {
		async function fetchPosts() {
			const nextURL: string = `http://localhost:3000/api/feed?username=${username}&xPosts=3&pageNum=0`;
			const data = await axios.get(nextURL).then((res) => res.data);
			console.log(data);
			setFeedData(data);
		}
		fetchPosts();
	}, [username]);
	return (
		<div className="homepage inline-flex flex-row w-screen">
			<MenuBar2 createPostForm={createPostForm()} />
			<div className="feed-container flex flex-col grow justify-center items-center h-full w-full overflow-hidden">
				<button
					className="btn shadow-none justify-start gap-7 fixed right-10 bottom-10"
					onClick={() =>
						document.getElementById("create_post_modal").showModal()
					}>
					{/* <a
							className="flex justify-start gap-7 text-black"
							// onClick={() =>
							// 	document.getElementById("create_post_modal").showModal()
							// }
						> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					Create Post
					{/* </a> */}
				</button>
				<dialog id="create_post_modal" className="modal">
					{createPostForm()}
				</dialog>
				<Post
					username={defaultUsername}
					title={defaultTitle}
					description={defaultDesc}
					img={defaultImg}
				/> */}
				<div className="post-container w-full flex flex-col items-center">
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
		</div>
	);
}
