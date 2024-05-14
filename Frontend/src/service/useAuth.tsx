import { Context, useContext } from "react";

export function useAuth(authContext: Context<unknown>) {
	return useContext(authContext);
}
