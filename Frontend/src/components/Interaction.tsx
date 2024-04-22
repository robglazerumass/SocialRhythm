import React from "react";
import {
	HandThumbUpIcon,
	HandThumbDownIcon,
	ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Interaction() {
	const [activeElementId, setActiveElementId] = useState("");

    const handleCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveElementId(event.currentTarget.id)
    }

    const getBgColor = (elementId: string) => {
        return elementId === activeElementId ? "bg-primary" : "bg-neutral-600"
    }

	return (
		<div className="interaction-row flex flex-row justify-between w-3/5 py-6">
			<div className="like-dislike-div flex gap-4">
				<button className={`like-btn  bg-opacity-30 flex items-center ${getBgColor("likes")}`}
                id="likes"
                onClick={handleCLick}>
					<HandThumbUpIcon className="h-6 inline" />
					<span className="px-2">&middot;</span>
					<span>2.3M</span>
				</button>
				<button className={`dislike-btn bg-neutral-600 bg-opacity-30 flex items-center ${getBgColor("dislikes")}`}
                id="dislikes"
                onClick={handleCLick}>
					<HandThumbDownIcon className="h-6 inline" />
					<span className="px-2">&middot;</span>
					<span>20k</span>
				</button>
			</div>
			<button id="comments" className={`bg-neutral-600 bg-opacity-30 flex items-center gap-2  ${getBgColor("comments")}`}
            onClick={handleCLick}>
				<ChatBubbleOvalLeftIcon className="h-6" />
				<span> 240k Comments</span>
			</button>
		</div>
	);
}
