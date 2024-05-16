import {
	HandThumbUpIcon,
	HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CommentModal from "./CommentModal";

export default function Interaction({
	postId,
	comments_list,
	likes,
	dislikes,
}) {
	const [activeElementId, setActiveElementId] = useState("");

	async function handleCommentModal() {
		// try{
		// 	const res = await axios.get(`http://localhost:3000/api/getComments?postId=${postId}`)
		// 	setComments(res.data)
		// 	console.log(res.data)
		// } catch(error){
		// 	console.log(error.message)
		// }
		return (
			document.getElementById("comment-popup") as HTMLDialogElement
		).showModal();
	}

	const handleCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setActiveElementId(event.currentTarget.id);
		// handleCommentModal()
	};

	const getBgColor = (elementId: string) => {
		return elementId === activeElementId ? "bg-primary" : "bg-neutral-600";
	};

	return (
		<div className="interaction-row flex flex-row justify-between py-6 w-full gap-2">
			<div className="like-dislike-div flex gap-4">
				<button
					className={`like-btn bg-purple-200 bg-opacity-20 flex items-center ${getBgColor(
						"likes"
					)}`}
					id="likes"
					onClick={handleCLick}>
					<HandThumbUpIcon className="h-6 inline" />
					<span className="px-2">&middot;</span>
					<span>{likes.length}</span>
				</button>
				<button
					className={`dislike-btn bg-purple-200 bg-opacity-20 flex items-center ${getBgColor(
						"dislikes"
					)}`}
					id="dislikes"
					onClick={handleCLick}>
					<HandThumbDownIcon className="h-6 inline" />
					<span className="px-2">&middot;</span>
					<span>{dislikes.length}</span>
				</button>
			</div>
			{/* <button
				id="comments"
				className={`bg-purple-200 bg-opacity-20 flex items-center justify-center gap-2 w-48`}
				onClick={handleCommentModal}
			>
				<ChatBubbleOvalLeftIcon className="h-6" />
				<span>{comments_list.length}</span>
			</button> */}
			<CommentModal postId={postId} comment_count={comments_list.length} />
		</div>
	);
}
