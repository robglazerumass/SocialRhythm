import axios from "axios";
import { ProfilePageType } from "../interface";
import { errorNotify, successNotify } from "../service/toast";
import BtnWide from "./BtnWide";
import { useState } from "react";

function FollowList({ name }: { name: string }) {
	return <div className="flex flex-row text-md">{name}</div>;
}

function FollowDisplay({
	text,
	num,
	nameList,
}: {
	text: string;
	num: number;
	nameList: string[];
}) {
	return (
		<div className="stats shadow bg-purple-btn">
			<button
				className="stat rounded-2xl"
				onClick={() =>
					document.getElementById(`follow_modal_${text}`).showModal()
				}>
				<div className="stat-title">{text}</div>
				<div className="stat-value">{num}</div>
			</button>
			<dialog id={`follow_modal_${text}`} className="modal">
				<div className="modal-box">
					<h2 className="font-bold text-2xl">{text}</h2>
					<div className="no-scrollbar flex flex-col py-4 min-w-full lg:max-h-40 overflow-y-scroll">
						{nameList.map((name) => (
							<FollowList name={name} />
						))}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}

function ProfileLeftCard(props: ProfilePageType) {
	const profileLink =
		"https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png";
	const [isCurrUser, setIsCurrUser] = useState(false);
	const [follow, setFollow] = useState(false);

	const checkCurrUser = () => {
		if (props.currUser == props.username) setIsCurrUser(true);
	};

	const checkFollowed = () => {
		if (props.currUser) return;
	};

	/*
		const testName = [
		"alice123",
		"gracewang",
		"jacksonL",
		"jackSmith",
		"anhl",
		"chaniel",
		"ryan",
		"emeka",
		"georges",
		"hassan",
		"aditi",
	];
	*/

	const handleFollow = async (event) => {
		event.preventDefault();
		const data = await axios
			.post(
				`http://localhost:3000/api/follow?username=${props.currUser}&userToFollow=${props.username}`
			)
			.then((res) => res.data)
			.catch((err) => errorNotify(err.response.data));
		if (data.message == `You are now following ${props.username}`) {
			successNotify(data.message);
		}
	};

	return (
		<div className="profile-left-container card bg-dark-purple w-2/5 flex flex-col">
			<figure className="px-10 pt-0">
				<img src={profileLink} className="rounded-full h-5/6"></img>
			</figure>
			<div className="card-body justify-start">
				<div className="card-title flex flex-col justify-start text-start gap-2 mb-3 items-start pl-6">
					<h2 className="text-[2.5rem] leading-10">{`${props.user_first_name} ${props.user_last_name}`}</h2>
					<p className="font-extralight text-md items-start">{`@${props.username}`}</p>
					<div className="bio-text text-[1.05rem] font-light">
						<p className="break-words line-clamp-2 min-h-20">{`${props.user_bio} more bio if this is two shorts. If it exceeds 2 words then...`}</p>
					</div>
				</div>
				<div className="bottom-container flex flex-col justify-center gap-2">
					<div className="follow-container flex flex-row justify-evenly mb-2">
						<FollowDisplay
							text="Followers"
							num={props.user_follower_list.length}
							nameList={props.user_follower_list}
							// nameList={testName}
						/>
						<FollowDisplay
							text="Following"
							num={props.user_following_list.length}
							nameList={props.user_following_list}
						/>
					</div>
					<div className="flex flex-col items-center">
						{props.currUser == props.username ? (
							<></>
						) : (
							<BtnWide
								name="Follow"
								eventClick={handleFollow}
								classNameStyle=""
								children={undefined}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileLeftCard;
