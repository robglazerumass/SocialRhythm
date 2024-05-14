import axios from "axios";
async function idLoader(username: string) {
	const idUrl: string = `http://localhost:3000/api/profile?username=${username}`;
	const userData = await axios.get(idUrl).then((res) => res.data);
	return userData;
}

export default idLoader;
