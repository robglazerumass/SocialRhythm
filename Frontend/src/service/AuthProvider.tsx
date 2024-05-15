import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import errorNotify from "./toast";
import axios from "axios";

interface AuthContextType {
	user: string;
	token: string;
	loginAction: ({
		currUsername,
		currPassword,
	}: {
		currUsername: string;
		currPassword: string;
	}) => Promise<void>;
	logoutAction: () => void;
}
export const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState("");
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
			setUser(currUsername);
			setToken(currUsername);
			sessionStorage.setItem("username", currUsername);
			navigate("/feed");
		}
	};

	const logoutAction = () => {
		setUser("");
		setToken("");
		sessionStorage.removeItem("username");
		navigate("/login");
	};
	return (
		<AuthContext.Provider value={{ user, token, loginAction, logoutAction }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
