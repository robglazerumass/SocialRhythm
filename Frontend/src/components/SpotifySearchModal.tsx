import axios from "axios";
import { useEffect, useState } from "react";

export default function SpotifySearchModal() {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		(async function fetchData() {
			if (searchTerm.length > 0) {
				try {
					const res = await axios.get(
						`http://localhost:3000/api/searchContent?searchTerm=${searchTerm}`
					);
                    console.log(res)
				} catch (error) {}
			} else {
				("");
			}
		})();
	}, [searchTerm]);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchTerm(event.currentTarget.value);
	};

	return (
		<div className="spotify-search-modal w-full">
			<form className="create-post-form w-full">
				<input
					type="text"
					placeholder="Search for a song"
					className="w-full h-12 px-4 rounded-md border-violet-300 border-2"
					onChange={handleChange}
					value={searchTerm}
				/>
			</form>
		</div>
	);
}
