import { XMarkIcon } from "@heroicons/react/24/outline";
import Post from "./Post";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SpotifySearchModal from "./SpotifySearchModal";

export default function CreatePostForm() {
	// const {state} = useLocation()
	// const { username } = state
	const [postData, setPostData] = useState({
		username: "",
		title: "",
		description: "",
		spotify_link: "",
		image_url: "",
	});

	return (
		<div className="modal-box flex flex-col gap-4 max-w-[800px]">
			<div className="modal-action m-0 p-0">
				<form
					method="dialog"
					className="h-8 w-full flex justify-end items-center">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn bg-transparent p-0">
						<XMarkIcon className="h-6 w-6" />
					</button>
				</form>
			</div>
			<div className="create-post flex">
				{/* <Post /> */}
				<SpotifySearchModal />
			</div>
		</div>
	);
}
