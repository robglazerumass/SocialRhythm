import { useLoaderData } from "react-router-dom";
import MenuBar from "../components/menubar";

function Profile() {
	const userData = useLoaderData();
	console.log(userData);
	return (
		<div className="profile-page flex flex-row w-screen h-screen">
			<div className="menubar-span w-1/5 ">
				<MenuBar />
			</div>
			<div className="h-[95%] m-4 flex flex-row w-full gap-3">
				<div className="profile-left-container card glass w-2/5 flex flex-col"></div>
				<div className="profile-right-container card glass w-full"></div>
			</div>
		</div>
	);
}

export default Profile;
