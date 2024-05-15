import FeedImage from "./FeedImage";

interface PostPropsType {
	title: string;
	description: string;
	img_url: string;
    spotify_url: string;
    spotify_audio_link: string;
}

export default function Preview({
	title,
	description,
	img_url,
    spotify_url,
    spotify_audio_link
}: PostPropsType) {

	return (
		<div className="preview-content w-full bg-primary bg-opacity-10 px-4 flex flex-col items-center justify-center rounded-lg drop-shadow-lg">
			<div className="top-half flex flex-col justify-center gap-5 py-3 w-full box-border">
				<div className="flex flex-col gap-4">
					<p className="font-extrabold text-3xl text-ellipses line-clamp-1">{title.length > 0 ? title: "Title..."}</p>
					<p className="max-w-[50ch] text-ellipses line-clamp-1">
						{description.length > 0 ? description : "Description..."}
					</p>
				</div>
			</div>
			<div className="h-full overflow-y-visible w-full flex flex-col items-center box-border justify-center">
				<FeedImage imageUrl={img_url} spotifyUrl={spotify_url}/>
                <audio controls src={spotify_audio_link}
                className="absolute"></audio>
			</div>
		</div>
	);
}
