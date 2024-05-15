import { PostType } from "../interface";
import postMockData from "../mockData/postMockData";
import Interaction from "./Interaction";

function PostCard(props: PostType) {
	const paraInteraction = {
		postId: props.id,
		comments_list: props.comments_list,
		likes: props.likes_list,
		dislikes: props.dislikes_list,
	};
	return (
		<div className="card card-side card-compact bg-[#54157d] shadow-xl h-2/3 justify-start">
			<figure
				className="flex flex-row w-4/5"
				style={{ justifyContent: "flex-start" }}>
				<img className="w-4/5" src={props.image_url} />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{props.title}</h2>
				<p>{props.description}</p>
				<div className="card-actions min-w-40  justify-end">
					<Interaction {...paraInteraction} />
				</div>
			</div>
		</div>
	);
}

function ProfileRightCard({ posts }: { posts: PostType[] }) {
	console.log("right props ", posts);
	return (
		<div className="p-4">
			{posts.map((post) => (
				<PostCard {...post} />
			))}
		</div>
	);
}

export default ProfileRightCard;
