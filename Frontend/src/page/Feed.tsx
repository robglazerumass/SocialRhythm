import MenuBar from "../components/MenuBar";
import postMockData from "../mockData/postMockData";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import CreatePostForm from "../components/createPostForm";

export default function Feed() {
	const [feedData, setFeedData] = useState(postMockData);
	const [showSearchModal, setShowSearchModal] = useState(false);
	const { state } = useLocation();
	const { username } = state;
	useEffect(() => {
		async function fetchPosts() {
			const nextURL: string = `http://localhost:3000/api/feed?username=${username}&xPosts=3&pageNum=0`;
			const data = await axios.get(nextURL).then((res) => res.data);
			setFeedData(data);
			console.log(data);
		}
		fetchPosts();
	}, [username]);
	return (
		<div className="homepage inline-flex flex-row w-screen">
			<MenuBar username={username} setShowSearchModal={setShowSearchModal} />
			<div className="feed-container flex flex-col grow justify-center items-center h-full w-full overflow-hidden">
				<button
					className="btn bg-primary bg-opacity-30 border-none text-white shadow-none justify-start gap-7 fixed right-10 bottom-10 hover:bg-primary hover:bg-opacity-30 hover:text-[#646cff]"
					onClick={() => {
						document.getElementById("create_post_modal").showModal();
					}}>
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
				</button>
				<dialog id="create_post_modal" className="modal w-full">
					<CreatePostForm />
					<form method="dialog" className="modal-backdrop">
						<button className="opacity-0">close</button>
					</form>
				</dialog>
				<div className="post-container w-full flex flex-col items-center">
					{feedData.map((post) => (
						<Post
							key={post._id}
							id={post._id}
							username={post.username}
							title={post.title}
							description={post.description}
							img={post.image_url}
							comments_list={post.comments_list}
							likes_list={post.likes_list}
							dislikes_list={post.dislikes_list}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
