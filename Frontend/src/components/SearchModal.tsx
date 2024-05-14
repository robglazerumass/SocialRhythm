import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SearchImage from "../assets/search-magnifier-magnifying-emoji-no-results-svgrepo-com.svg";
import axios from "axios";

interface userInfo {
    username: string;
    user_last_name: string;
    user_first_name: string;
    _id: string;
}

export default function SearchModal() {
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [resultMessage, setResultMessage] = useState("");
	useEffect(() => {
		(async function fetchData() {
			if(searchQuery.length > 0){
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
            }
            else {
                setResultMessage("")
                setData([])
            }
		})();
	}, [searchQuery]);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchQuery(event.currentTarget.value);
	};
	function handleSearchModal() {
		return (
			document.getElementById("search-popup") as HTMLDialogElement
		).showModal();
	}

	return (
		<>
			<button
				className="m-0 p-0 bg-transparent"
				onClick={handleSearchModal}
			>
				<a className="flex justify-center gap-2 text-white flex-col p-0 items-center">
					<MagnifyingGlassIcon className="h-6 w-6" />
					<p>Search</p>
				</a>
			</button>
			<dialog id="search-popup" className="modal">
				<div className="search-box modal-box h-[80%] max-w-[50%] bg-indigo-950 bg-opacity-90 p-0">
					<div className="flex items-center w-full justify-between sticky top-0 py-4 px-8 backdrop-blur-md">
						<p className="text-3xl font-bold">Searches</p>
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-sm btn-circle btn-ghost flex items-center">
								<XMarkIcon />
							</button>
						</form>
					</div>
					<form onSubmit={(event) => {event.preventDefault()}} className="sticky top-0 flex items-stretch w-full justify-between py-4 px-8 backdrop-blur-md gap-4 h-20">
						<input
							placeholder="Search for users..."
							type="text"
							className="px-5 rounded-2xl flex-grow bg-transparent border-2 border-white border-opacity-35"
							value={searchQuery}
							onChange={handleChange}
						/>
						<button className="bg-primary rounded-2xl" type="submit">
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
								<p className="w-full text-center font-bold text-4xl opacity-50">{resultMessage}</p>
							</>
						) : (
							<div className="flex shrink-1 flex-col gap-4">
								{data.map((person: userInfo) => (
									<div className="flex justify-between items-center">
                                        <img src="https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg"
                                        className="h-12 w-12 rounded-full aspect-square"/>
                                        <p>{person.username}</p>
                                        <button className="bg-primary ">Follow</button>
                                    </div>
								))}
							</div>
						)}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="opacity-0">close</button>
				</form>
			</dialog>
		</>
	);
}
