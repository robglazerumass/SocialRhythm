import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "./toast";
import axios from "axios";
import { ProfileType } from "../interface";
import idLoader from "./getId";

interface AuthContextType {
	user: ProfileType;
	token: string;
	loginAction: ({
		currUsername,
		currPassword,
	}: {
		currUsername: string;
		currPassword: string;
	}) => Promise<void>;
	logoutAction: () => void;
	signupAction: ({
		firstName,
		lastName,
		email,
		username,
		password,
	}: {
		firstName: string;
		lastName: string;
		email: string;
		username: string;
		password: string;
	}) => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<ProfileType>({
		username: "",
		user_bio: "",
		user_first_name: "",
		user_last_name: "",
		user_follower_list: [],
		user_following_list: [],
		user_post_list: [],
	});
	const [token, setToken] = useState(sessionStorage.getItem("username") || "");
	const navigate = useNavigate();

	const loginAction = async (userData: {
		currUsername: string;
		currPassword: string;
	}) => {
		const { currUsername, currPassword } = userData;
		const url = `http://localhost:3000/api/login?username=${currUsername}&password=${currPassword}`;
		const data = await axios
			.get(url)
			.then((res) => res.data)
			.catch((err) => errorNotify(err.response.data));
		if (data.result == "SUCCESS") {
			console.log("fetching ...");
			try {
				const profileData = await idLoader(currUsername);
				console.log("fetched successfull ", profileData);
				setUser(profileData);
				setToken(currUsername);
				sessionStorage.setItem("currUser", currUsername);
				navigate("/feed");
			} catch (err) {
				console.log(err);
			}
		}
	};

	const logoutAction = () => {
		setUser({
			username: "",
			user_bio: "",
			user_first_name: "",
			user_last_name: "",
			user_follower_list: [],
			user_following_list: [],
			user_post_list: [],
		});
		setToken("");
		sessionStorage.removeItem("currUser");
		navigate("/login");
	};

	const signupAction = async (newUser: {
		firstName: string;
		lastName: string;
		email: string;
		username: string;
		password: string;
	}) => {
		const { firstName, lastName, email, username, password } = newUser;
		const url = `http://localhost:3000/api/signup?firstname=${firstName}&lastname=${lastName}&username=${username}&password=${password}&email=${email}`;
		const data = await axios
			.post(url)
			.then((res) => res.data)
			.catch((err) => errorNotify(err.response.data));
		if (data.result == "SUCCESS") {
			successNotify(`${data.message}. Please log in!`);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, token, loginAction, logoutAction, signupAction }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
