import { ReactNode } from "react";

export interface ProfileType {
	[x: string]: any;
	username: string;
	bio: string;
	firstName: string;
	lastName: string;
	followers: string[];
	following: string[];
	postList: PostType[];
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
