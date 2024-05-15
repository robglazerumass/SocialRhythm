import { useLoaderData } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import ProfileLeftCard from "../components/ProfileLeftCard";
import useAuth from "../service/useAuth";
import { ProfileType } from "../interface";

function Profile() {
	const auth = useAuth();
	const userData: ProfileType = useLoaderData() as ProfileType;
	const currUser = auth.user;
	const profileUser = {
		...userData,
		isCurrUser: currUser,
	};
	console.log(userData);
	return (
		<div className="profile-page flex flex-row w-screen h-screen">
			<div className="menubar-span w-1/6 ">
				<MenuBar />
			</div>
			<div className="h-[95%] m-4 flex flex-row w-full gap-3">
				<ProfileLeftCard {...profileUser} />
				<div className="profile-right-container card bg-dark-purple w-full"></div>
			</div>
		</div>
	);
}

export default Profile;
