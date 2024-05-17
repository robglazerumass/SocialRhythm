export interface LoginForm {
	username: string;
	password: string;
}

export interface ProfileType {
	username: string;
	user_bio: string;
	user_first_name: string;
	user_last_name: string;
	user_follower_list: string[];
	user_following_list: string[];
	user_post_list: PostType[];
}

export interface ProfilePageType {
	visitUser: ProfileType;
	// username: string;
	// user_bio: string;
	// user_first_name: string;
	// user_last_name: string;
	// user_follower_list: string[];
	// user_following_list: string[];
	// user_post_list: PostType[];
	targetUser: ProfileType;
}

export interface PostType {
	key: string;
	_id: string;
	username: string;
	title: string;
	description: string;
	image_url: string;
	comments_list: object[];
	likes_list: string[];
	dislikes_list: string[];
	spotify_link: string;
}

export interface MyBtnType {
	classNameStyle: string;
	eventClick: (() => void) | undefined;
	children: ReactNode | undefined;
	name: string;
}
