import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import Login from "./page/Login.tsx";
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
		element: <div>Signup</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
