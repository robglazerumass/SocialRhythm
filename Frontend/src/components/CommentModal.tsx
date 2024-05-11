import React from "react";
import { ChatBubbleOvalLeftIcon, HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { mockComments } from "../mockData/commentMockData";

interface CommentInfo {
	userName: String,
	comment: String
}
function Comment({userName, comment}: Readonly<CommentInfo>){
	return (
		<div className="w-full py-4 flex">
			<div className="w-5/6">
			<p className="font-bold pb-1">{userName}</p>
			<p className="">{comment}</p>
			</div>
			<div className="flex gap-4 ">
			<button className="bg-transparent flex flex-col justify-center items-center h-max"
                id="comment-likes">
					<HandThumbUpIcon className="h-6" />
					<span>2.3M</span>
				</button>
				<button className="bg-transparent flex flex-col justify-center items-center h-max"
                id="comment-likes">
					<HandThumbDownIcon className="h-6" />
					<span>2.3M</span>
				</button>
			</div>
		</div>
	)
}

export default function CommentModal() {
	function handleCommentModal() {
		return (
			document.getElementById("comment-popup") as HTMLDialogElement
		).showModal();
	}

	return (
		<>
			<button
				id="comments"
				className={`bg-neutral-600 bg-opacity-30 flex items-center gap-2`}
				onClick={handleCommentModal}
			>
				<ChatBubbleOvalLeftIcon className="h-6" />
				<span> 240k Comments</span>
			</button>
			<dialog id="comment-popup" className="modal">
				<div className="comment-box modal-box max-h-[80%] max-w-[50%] bg-indigo-950 bg-opacity-90 p-0">
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
						{mockComments.map(commentData => <Comment userName={commentData.userName} comment={commentData.comment}/>)}
					</div>
					<div className="sticky bottom-0 flex items-stretch w-full justify-between py-4 px-8 backdrop-blur-md gap-4">
						<input placeholder="Add a comment..." type="text" 
						className="px-5 rounded-xl flex-grow bg-transparent border-2 border-white border-opacity-35"/>
						<button className="bg-primary">
							<PaperAirplaneIcon className="h-10"/>
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="opacity-0">close</button>
				</form>
			</dialog>
		</>
	);
}
