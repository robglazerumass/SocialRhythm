import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function useAuth() {
	return useContext(AuthContext);
}

export default useAuth;
