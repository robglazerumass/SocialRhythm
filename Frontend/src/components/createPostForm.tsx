import { XMarkIcon } from "@heroicons/react/24/outline";
import Post from "./Post";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Preview from "./Preview";
import axios from "axios";

interface Artist {
	external_url: { spotify: string };
	name: string;
	type: string;
}
interface Track {
	artists: Artist[];
	external_urls: { spotify: string };
	name: string;
	preview_url: string | null;
}

export default function CreatePostForm() {
	const { state } = useLocation();
	const { username } = state;
	const [postData, setPostData] = useState({
		username: username,
		title: "",
		description: "",
		image_url: "",
		spotify_link: "",
		audio_prev_link: "",
	});
	const [spotifyQuery, setSpotifyQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Track[]>([]);

	const SEARCH_INTERVAL = 1500; // after the user stops typing for x seconds, search spotify

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		setPostData((prev) => ({
			...prev,
			[(event.target as HTMLInputElement).name]: (
				event.target as HTMLInputElement
			).value,
		}));
	};

	useEffect(() => {
		const waitToSearch = setTimeout(async () => {
			try {
				if (spotifyQuery.length > 0) {
					console.log(`searching ... ${spotifyQuery}`);
					const url = `http://localhost:3000/api/searchContent?searchTerm=${spotifyQuery}&type=track&limit=${5}`;
					const spotifySearchResult = await axios.get(url);
					const songs: Track[] =
						spotifySearchResult.data.tracks.items;
					setSearchResults(songs);
				}
			} catch (error) {
				console.error(error);
			}
		}, SEARCH_INTERVAL);
		return () => clearTimeout(waitToSearch);
	}, [spotifyQuery]);

	return (
		<div className="modal-box flex flex-col gap-4 max-w-[1000px] h-4/5">
			<div className="modal-action m-0 p-0 absolute top-4 right-4">
				<form
					method="dialog"
					className="h-8 w-full flex justify-end items-center"
				>
					{/* if there is a button in form, it will close the modal */}
					<button className="btn bg-transparent p-0 m- border-0">
						<XMarkIcon className="h-6 w-6" />
					</button>
				</form>
			</div>
			<div className="create-post flex h-full p-4 w-full gap-8 overflow-clip">
				<Preview
					title={postData.title}
					description={postData.description}
					img_url={postData.image_url}
					spotify_url={postData.spotify_link}
					spotify_audio_link=""
				/>
				<form
					id="create-post-form"
					className="flex flex-col gap-4 w-5/12 h-full"
				>
					<input
						className="h-12 bg-transparent border-2 border-purple-400 border-opacity-50 rounded-md p-4"
						name="title"
						value={postData.title}
						placeholder="Title..."
						onChange={handleChange}
						autoComplete="off"
						required
					/>
					<textarea
						className="h-24 bg-transparent border-2 border-purple-400 border-opacity-50 rounded-md p-4"
						name="description"
						value={postData.description}
						placeholder="Post details..."
						cols={50}
						rows={4}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
					<input
						className="h-12 bg-transparent border-2 border-purple-400 border-opacity-50 rounded-md p-4"
						name="image_url"
						value={postData.image_url}
						placeholder="Link to image..."
						onChange={handleChange}
						autoComplete="off"
						required
					/>
					<input
						className="h-12 bg-transparent border-2 border-purple-400 border-opacity-50 rounded-md p-4"
						name="spotify-search"
						value={spotifyQuery}
						onChange={(event) => {
							setSearchResults([]);
							setSpotifyQuery(
								(event.target as HTMLInputElement).value
							);
						}}
						placeholder="Search Song on Spotify..."
						autoComplete="off"
					/>
					{searchResults.length > 0 && spotifyQuery.length > 0 ? (
						<ul id="search_reults" className="bg-white bg-opacity-10 rounded-lg flex flex-col justify-between shadow-xl cursor-pointer p-2 gap-2">
							{searchResults.map((track, i) => (
								<button
									key={i}
									className="flex flex-col px-2 w-full text-ellipsis overflow-clip hover:bg-primary rounded-md hover:text-white p-0 bg-transparent"
									onClick={(e) => {
										setPostData({
											...postData,
											spotify_link:
											track.external_urls.spotify,
											audio_prev_link:
											track.preview_url ?? "",
										});
										setSearchResults([])
									}}
								>
									<p className="line-clamp-1 text-ellipsis font-bold">
										{track.name}
									</p>
									<p className="text-sm opacity-70 text-ellipsis line-clamp-1">{`by: ${track.artists
										.filter(
											(artist) => artist.type === "artist"
										)
										.map((artist) => artist.name)
										.join(", ")}`}</p>
								</button>
							))}
						</ul>
					) : (
						<></>
					)}
				</form>
			</div>
		</div>
	);
}
