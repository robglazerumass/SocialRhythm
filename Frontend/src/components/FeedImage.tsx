import spotifyLogo from "../assets/spotify_logo.png"

export default function FeedImage() {
    const imageUrl = "https://images.pexels.com/photos/17731677/pexels-photo-17731677/free-photo-of-a-red-parachute-flying-through-the-air-in-a-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
	return (
		<div className="temp-feed-view h-full overflow-y-scroll w-full flex justify-center">
			<div className="image-view relative w-3/5">
				<img
					src={imageUrl}
					className="post-image aspect-square"
				/>
                <a className="spotify-link absolute bottom-5 right-5" href="https://www.spotify.com">
                    <button className="spotify-btn bg-[#191414] rounded-full flex items-center justify-center gap-3 text-[#1DB954] border-[#1DB954] h-10 w-10 lg:w-auto">
                        <img src={spotifyLogo} className="max-h-6 max-w-6 inline bg-[#191414] rounded-full"/>
                        <p className="hidden lg:inline">Open in spotify</p>
                    </button>
                </a>
			</div>
		</div>
	);
}
