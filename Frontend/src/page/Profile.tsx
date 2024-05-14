import { useLoaderData } from "react-router-dom";
import { ProfileType } from "../../interface/interface";
import MenuBar from "../components/menubar";
import ProfileLeftCard from "../components/ProfileLeftCard";

function Profile() {
	const userData: ProfileType = useLoaderData() as ProfileType;
	console.log(userData);
	return (
		<div className="profile-page flex flex-row w-screen h-screen">
			<div className="menubar-span w-1/6 ">
				<MenuBar />
			</div>
			<div className="h-[95%] m-4 flex flex-row w-full gap-3">
				<ProfileLeftCard {...userData} />
				<div className="profile-right-container card bg-dark-purple w-full"></div>
			</div>
		</div>
	);
}

export default Profile;
