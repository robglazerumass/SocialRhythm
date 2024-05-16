import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import SearchImage from "../assets/search-magnifier-magnifying-emoji-no-results-svgrepo-com.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface userInfo {
	username: string,
	user_last_name: string,
	user_first_name: string,
	_id: string,
}

interface Profile {
	user_first_name: string,
	user_last_name: string,
	user_email: string,
	username: string,
	user_bio: string,
	user_following_list: string[],
	user_follower_list: string[],
	user_post_list: []
}

export default function SearchModal({ selected, setSelected }: Readonly<{selected: string; setSelected: React.Dispatch<React.SetStateAction<string>>;}>) {
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [resultMessage, setResultMessage] = useState("");
	const {state} = useLocation()
	const {username} = state
	const [profile, setProfile] = useState<Profile>()

	useEffect(() => {
		(async () => {
			try{
				const res = await axios.get(`http://localhost:3000/api/profile?username=${username}`)
				setProfile(res.data)
			} catch(error){
				console.error(error)
			}
		})()
	}, [])

	useEffect(() => {
		(async function fetchData() {
			if (searchQuery.length > 0) {
				try {
					const res = await axios.get(
						`http://localhost:3000/api/search?searchTerm=${searchQuery}`
					);
					setData(res.data);
					setResultMessage("");
				} catch (error) {
					setResultMessage("No result found :(");
					setData([]);
				}
			} else {
				setResultMessage("");
				setData([]);
			}
		})();
	}, [searchQuery]);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchQuery(event.currentTarget.value);
	};

	const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>)=>{
		try{
			const usernameToFollow = (event.target as HTMLElement).getAttribute("forUser")
			const _ = await axios.post(`http://localhost:3000/api/follow?username=${username}&userToFollow=${usernameToFollow}`)
			const res = await axios.get(`http://localhost:3000/api/profile?username=${username}`)
			setProfile(res.data)
		} catch(error){
			console.error(error)
		}
	}

	const handleUnfollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
		try{
			const usernameToUnollow = (event.target as HTMLElement).getAttribute("forUser")
			await axios.post(`http://localhost:3000/api/unfollow?username=${username}&userToUnfollow=${usernameToUnollow}`)
			const res = await axios.get(`http://localhost:3000/api/profile?username=${username}`)
			setProfile(res.data)
		} catch(error){
			console.error(error)
		}
	}

	function handleSearchModal() {
		setSelected(name);
		return (
			document.getElementById("search-popup") as HTMLDialogElement
		).showModal();
	}

	const name = "Search";
	const isSelected = selected === name;

	return (
		<>
			<button
				className={`m-0 rounded-full h-16 w-16 ${
					isSelected ? `bg-white bg-opacity-30` : `bg-transparent`
				}`}
				onClick={handleSearchModal}
			>
				<a className="flex justify-center gap-2 text-white flex-col p-0 items-center">
					<MagnifyingGlassIcon className="h-6 w-6" />
				</a>
			</button>
			<dialog id="search-popup" className="modal">
				<div className="search-box modal-box h-[80%] max-w-[50%] bg-indigo-950 bg-opacity-90 p-0">
					<div className="flex items-center w-full justify-between sticky top-0 py-4 px-8 backdrop-blur-md">
						<p className="text-3xl font-bold">Searches</p>
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-sm btn-circle btn-ghost flex items-center"
							onClick={() => {setSelected("Feed")}}>
								<XMarkIcon />
							</button>
						</form>
					</div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
						className="sticky top-0 flex items-stretch w-full justify-between py-4 px-8 backdrop-blur-md gap-4 h-20"
					>
						<input
							placeholder="Search for users..."
							type="text"
							className="px-5 rounded-2xl flex-grow bg-transparent border-2 border-white border-opacity-35"
							value={searchQuery}
							onChange={handleChange}
						/>
						<button
							className="bg-primary rounded-2xl"
							type="submit"
						>
							<MagnifyingGlassIcon className="h-6" />
						</button>
					</form>
					<div className="searches px-8 flex flex-col gap-4 justify-center">
						{data.length === 0 ? (
							<>
								<img
									src={SearchImage}
									className="no-result-image h-[300px] opacity-30 mt-20"
								/>
								<p className="w-full text-center font-bold text-4xl opacity-50">
									{resultMessage}
								</p>
							</>
						) : (
							<div className="flex shrink-1 flex-col gap-10">
								{data.filter((person: userInfo) => person.username !== username).map((person: userInfo) => (
									<div className="flex justify-between items-center">
										<p>{person.username}</p>
										{profile?.user_following_list.includes(person.username) ? (
											<button forUser={person.username} className="border-2 bg-transparent border-indigo-400 w-36 "
											onClick={handleUnfollow}>
											Unfollow
										</button>
										) : (
											<button forUser={person.username} className="bg-primary w-36"
											onClick={handleFollow}>
											Follow
										</button>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop" onClick={() => {setSelected("Feed")}}>
					<button className="opacity-0">close</button>
				</form>
			</dialog>
		</>
	);
}
