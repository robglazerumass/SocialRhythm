import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import signup_img from "../assets/signup_img.jpg";
import { toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function Login() {
	const [loginForm, setLoginForm] = useState({ username: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	// const [navPossible, setNavPossible] = useState(false);
	let location = useLocation();
	const navigate = useNavigate();
	const errorNotify = (message: string) => {
		toast(message, {
			type: "error",
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
	};

	const handleShowPassword = () => {
		if (!showPassword) setShowPassword(true);
		else setShowPassword(false);
	};

	const handleChange = (event: { target: { name: string; value: string } }) => {
		const { name, value } = event.target;
		setLoginForm((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const url = `http://localhost:3000/api/login?username=${loginForm.username}&password=${loginForm.password}`;
		const data = await axios
			.get(url)
			.then((res) => {
				return res.data;
			})
			.catch((err) => errorNotify(err.response.data));
		if (data.result == "SUCCESS") {
			console.log("from ", location.state?.from?.pathname || "/");
			navigate("/feed", {
				state: { username: loginForm.username, replace: true },
			});
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="card glass flex flex-row w-full shadow-xl h-[90%] lg:w-[90%] rounded-lg">
				<div className="flex w-0 lg:w-3/5">
					<img
						className="rounded-l-lg object-cover"
						src={signup_img}
						alt="party"
					/>
				</div>
				<div className="card-body lg:w-96 flex justify-center">
					<h2 className="card-title text-3xl">Login</h2>
					<div className="flex flex-col gap-6">
						<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
							<div className="flex flex-col gap-2">
								<div>
									<div className="label">
										<span className="label-text text-md text-white">
											Username
										</span>
									</div>
									<label className="form-control w-full">
										<input
											type="text"
											placeholder="Type here"
											className="input input-bordered input-primary flex items-center gap-2 bg-transparent border-gray-400 focus:border-blue-500 "
											name="username"
											value={loginForm.username}
											onChange={handleChange}></input>
									</label>
								</div>
								<div>
									<div className="label">
										<span className="label-text text-md text-white">
											Password
										</span>
									</div>
									<label className="input flex items-center input-primary gap-2 bg-transparent border-gray-400 focus:border-blue-500 ">
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Type here"
											className="grow"
											name="password"
											value={loginForm.password}
											onChange={handleChange}
										/>
										<button
											className="btn btn-link border-transparent focus:outline-none"
											type="button"
											onClick={handleShowPassword}>
											{showPassword ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="w-6 h-6">
													<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
													<path
														fillRule="evenodd"
														d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
														clipRule="evenodd"
													/>
												</svg>
											)}
										</button>
									</label>
								</div>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer justify-between">
									<div className="flex justify-start gap-2 flex-row">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
										<span className="label-text text-white">Remember me</span>
									</div>
									<button className="btn btn-link pr-0">
										Forgot your password?
									</button>
								</label>
							</div>
							<div className="flex flex-col gap-3 justify-center">
								<button className="btn btn-block btn-primary" type="submit">
									Login
								</button>
								<div>
									<p>
										Don't have an account yet?
										<Link to={"../signup"}> Sign up!</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
