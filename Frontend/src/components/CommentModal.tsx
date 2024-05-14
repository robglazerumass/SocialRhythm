import {
	ChatBubbleOvalLeftIcon,
	HandThumbDownIcon,
	HandThumbUpIcon,
	PaperAirplaneIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface CommentInfo {
	_id: string;
	post_id: string;
	username: string;
	comment: string;
	comment_like_list: [];
	comment_dislike_list: [];
	date_created: string;
}

interface CommentProps {
	postId: string;
	comment_count: number;
}

function Comment({
	username,
	comment,
	like_count,
	dislike_count,
}: Readonly<CommentInfo>) {
	return (
		<div className="w-full py-4 flex">
			<div className="w-5/6">
				<p className="font-bold pb-1">{username}</p>
				<p className="">{comment}</p>
			</div>
			<div className="flex gap-4 ">
				<button
					className="bg-transparent flex flex-col justify-center items-center h-max"
					id="comment-likes">
					<HandThumbUpIcon className="h-6" />
					<span>{like_count}</span>
				</button>
				<button
					className="bg-transparent flex flex-col justify-center items-center h-max"
					id="comment-likes">
					<HandThumbDownIcon className="h-6" />
					<span>{dislike_count}</span>
				</button>
			</div>
		</div>
	);
}

export default function CommentModal({
	postId,
	comment_count,
}: Readonly<CommentProps>) {
	// const { state } = useLocation()
	// const { username } = state
	const [addedComment, setAddedComment] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get(
				`http://localhost:3000/api/getComments?postId=${postId}`
			);
			setComments(res.data);
		})();
	}, []);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setAddedComment(event.currentTarget.value);
	};

	const handleCommentSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		try {
			console.log(postId);
			const url = `http://localhost:3000/api/createComment?username=${username}&postId=${postId}&commentString=${addedComment}`;
			const postCommentRes = await axios.post(url);
			const res = await axios.get(
				`http://localhost:3000/api/getComments?postId=${postId}`
			);
			setComments(res.data);
			setAddedComment("");
		} catch (error) {
			console.log(error.message);
		}
	};

	function handleCommentModal() {
		(
			document.getElementById(`comment-popup-${postId}`) as HTMLDialogElement
		).showModal();
	}

	return (
		<>
			<button
				id={`comments-${postId}`}
				className={`bg-purple-200 bg-opacity-20 flex items-center justify-center gap-2 w-48`}
				onClick={handleCommentModal}>
				<ChatBubbleOvalLeftIcon className="h-6" />
				<span>{comment_count}</span>
			</button>
			<dialog id={`comment-popup-${postId}`} className="modal">
				<div className="comment-box modal-box h-[80%] max-w-[50%] bg-indigo-950 bg-opacity-90 p-0 flex flex-col justify-between">
					<div className="flex items-center w-full justify-between sticky top-0 py-4 px-8 backdrop-blur-md">
						<p className="text-3xl font-bold">Comments</p>
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-sm btn-circle btn-ghost flex items-center">
								<XMarkIcon />
							</button>
						</form>
					</div>
					<div className="comments px-8 flex flex-col gap-4">
						{comments.map((e: CommentInfo) => (
							<Comment
								_id={e._id}
								username={e.username}
								comment={e.comment_string}
								like_count={e.comment_like_list.length}
								dislike_count={e.comment_dislike_list.length}
							/>
						))}
					</div>
					<form
						className="sticky bottom-0 flex items-stretch w-full justify-between py-4 px-8 backdrop-blur-md gap-4"
						onSubmit={handleCommentSubmit}
						id={postId}>
						<input
							placeholder="Add a comment..."
							type="text"
							value={addedComment}
							onChange={handleChange}
							className="px-5 rounded-xl flex-grow bg-transparent border-2 border-white border-opacity-35 h-12"
						/>
						<button className="bg-primary" type="submit">
							<PaperAirplaneIcon className="h-6" />
						</button>
					</form>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="opacity-0">close</button>
				</form>
			</dialog>
		</>
	);
}
