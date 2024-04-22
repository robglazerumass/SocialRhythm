import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";
import Login from "./page/Login.tsx";
import SignUp from "./page/SignUp.tsx";
import Feed from "./page/Feed.tsx";
import MenuBar from "./components/menubar.tsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "signup",
		element: <SignUp />
	},
	{
		path: "friends",
		element: <Feed />
	},
	{
		path: "feed",
		element: <Feed/>
	},

	{
		path: "trending",
		element: <Feed />
	}
	
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
