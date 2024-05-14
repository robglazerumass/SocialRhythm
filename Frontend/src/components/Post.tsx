import { Link } from "react-router-dom";
import FeedImage from "./FeedImage";
import Interaction from "./Interaction";

interface PostPropsType {
	id: string;
	username: string;
	title: string;
	description: string;
	img: string;
	comments_list: object[];
	likes_list: string[];
	dislikes_list: string[];
}

export default function Post({
	id,
	username,
	title,
	description,
	img,
	comments_list,
	likes_list,
	dislikes_list,
}: PostPropsType) {
	return (
		<div className="post-content w-2/5 bg-primary bg-opacity-10 my-10 px-10 rounded-lg drop-shadow-lg">
			<div className="top-half flex flex-col justify-center gap-5 py-5 w-full box-border">
				<div className="flex flex-row gap-4">
					<div className="avatar">
						<div className="w-12 rounded-full">
							<img src={img} />
						</div>
					</div>
					<div className="min-h-full flex flex-col justify-center text-xl font-bold">
						<p>
							<Link to={`../user/${username}`}>{username}</Link>
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<p className="font-extrabold text-3xl">{title}</p>
					<p className="max-w-full flex flex-wrap break-all">{description}</p>
				</div>
			</div>
			<div className="temp-feed-view h-full overflow-y-visible w-full flex flex-col items-center box-border">
				<FeedImage />
				<Interaction
					postId={id}
					comments_list={comments_list}
					likes={likes_list}
					dislikes={dislikes_list}
				/>
			</div>
		</div>
	);
}
