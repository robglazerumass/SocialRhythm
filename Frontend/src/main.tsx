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
import AuthProvider from "./service/AuthProvider.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [],
	},
	{
		path: "login",
		element: (
			<AuthProvider>
				<Login />
			</AuthProvider>
		),
	},
	{
		path: "signup",
		element: <SignUp />,
	},
	{
		path: "feed",
		element: (
			<AuthProvider>
				<Feed />
			</AuthProvider>
		),
	},
	{
		path: "/user/:username",
		element: (
			<AuthProvider>
				<Profile />
			</AuthProvider>
		),
		loader: ({ params }) => {
			if (params == undefined) return idLoader("alice123");
			return idLoader(params.username as string);
		},
	},
	{
		path: "friends",
		element: <Feed />,
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
