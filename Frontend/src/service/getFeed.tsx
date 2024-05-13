import axios from "axios";

async function fetchPosts(username: string) {
	const nextURL: string = `http://localhost:3000/api/feed?username=${username}&xPosts=3&pageNum=0`;
	const data = await axios.get(nextURL).then((res) => res.data);
	console.log(data);
}

export default fetchPosts;
