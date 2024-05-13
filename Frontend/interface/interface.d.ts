interface ProfileType {
	username: string;
	bio: string;
	firstName: string;
	lastName: string;
	followers: string[];
	following: string[];
	postList: PostType[];
}

interface PostType {
	username: string;
	title: string;
	description: string;
	imgUrl: string;
	likeList: string[];
	dislikeList: string[];
	commentList: string[];
	dateCreated: Date;
	spotifyLink: string;
}
