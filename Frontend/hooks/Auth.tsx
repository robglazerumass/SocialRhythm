import { createContext, useState } from "react";

interface AuthContextType {
	user: unknown;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
	let [user, setUser] = useState(null);
}
