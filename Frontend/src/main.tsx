import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login.tsx";
import SignUp from "./page/SignUp.tsx";
import Feed from "./page/Feed.tsx";
import { ToastContainer, Bounce } from "react-toastify";
import Profile from "./page/Profile.tsx";
import idLoader from "./service/getId.tsx";

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
		element: <SignUp />,
	},
	{
		path: "friends",
		element: <Feed />,
	},
	{
		path: "feed",
		element: <Feed />,
	},
	{
		path: "/user/:username",
		element: <Profile />,
		loader: ({ params }) => {
			if (params == undefined) return idLoader("alice123");
			return idLoader(params.username as string);
		},
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			transition={Bounce}
		/>
	</React.StrictMode>
);
