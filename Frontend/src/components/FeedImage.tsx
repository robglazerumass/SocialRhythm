import spotifyLogo from "../assets/spotify_logo.png";

export default function FeedImage({imageUrl, spotifyUrl}: Readonly<{imageUrl: string; spotifyUrl: string}>) {
	const fallbackImgUrl = "https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png"
	return (
		<div className="image-view relative w-full max-h-[500px]">
			<div className="h-[450px]">
				<img src={imageUrl?.length > 0 ? imageUrl : fallbackImgUrl} className="preview-image w-full h-[450px] object-cover aspect-square" />
			</div>
			<a
				className="spotify-link absolute bottom-5 right-5"
				href={spotifyUrl?.length > 0 ? spotifyUrl : "https://www.spotify.com"}>
				<button className="spotify-btn bg-[#191414] rounded-full flex items-center justify-center gap-3 text-[#1DB954] border-[#1DB954] h-10 w-10 lg:w-auto">
					<img
						src={spotifyLogo}
						className="max-h-6 max-w-6 inline bg-[#191414] rounded-full"
						alt="spotify logo"
					/>
					<p className="hidden lg:inline">Open in spotify</p>
				</button>
			</a>
		</div>
	);
}
