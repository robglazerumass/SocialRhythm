import { ProfileType } from "../interface";

function ProfileLeftCard(props: ProfileType) {
	const profileLink =
		"https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png";
	return (
		<div className="profile-left-container card bg-dark-purple w-2/5 flex flex-col">
			<figure className="px-10 pt-1">
				<img src={profileLink} className="rounded-full h-2/3"></img>
			</figure>
			<div className="card-body py-1">
				<div className="card-title flex flex-col justify-start gap-2">
					<h2 className="text-5xl">{`${props.user_first_name} ${props.user_last_name}`}</h2>
					<p className="font-extralight text-md">{`@${props.username}`}</p>
					<div className="bio-text text-md font-light">
						<p>{`${props.user_bio} more bio if this is two shorts. If it exceeds 2 words then...`}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileLeftCard;
