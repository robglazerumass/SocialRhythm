import { ReactNode } from "react";

interface ProfileType {
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
	name: string;
	classNameStyle: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	children: ReactNode;
}

export default ProfileType;
