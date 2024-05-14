import { ReactNode } from "react";

export interface ProfileType {
	username: string;
	user_bio: string;
	user_first_name: string;
	user_last_name: string;
	user_follower_list: string[];
	user_following_list: string[];
	user_post_list: PostType[];
}

export interface PostType {
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

export interface MyBtnType {
	classNameStyle: string;
	eventClick: (() => void) | undefined;
	children: ReactNode | undefined;
	name: string;
}
