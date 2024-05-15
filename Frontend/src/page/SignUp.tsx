import { Link, useNavigate } from "react-router-dom";
import signup_img from "../assets/signup_img.jpg";
import { useState } from "react";
import axios from "axios";
import useAuth from "../service/useAuth";
import { successNotify } from "../service/toast";

export default function SignUp() {
	const [signupForm, setSignupForm] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		email: "",
	});
	const auth = useAuth();
	const navigate = useNavigate();
	const handleChange = (event: { target: { name: string; value: string } }) => {
		const { name, value } = event.target;
		setSignupForm((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		try {
			event.preventDefault();
			const url = `http://localhost:3000/api/signup?firstname=${signupForm.firstname}&lastname=${signupForm.lastname}&username=${signupForm.username}&password=${signupForm.password}&email=${signupForm.email}`;
			const data = await axios.post(url).then((res) => res.data);
			if (data.result == "SUCCESS") {
				successNotify(`${data.message}. Please log in!`);
			}
		} catch (err: unknown) {
			console.log(err);
		}
	};
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-row bg-base-100 w-full shadow-xl h-[90%] lg:w-5/6 rounded-lg">
				<div className="flex w-0 lg:w-3/5">
					<img
						className="rounded-l-lg object-cover"
						src={signup_img}
						alt="party"
					/>
				</div>
				<div className="card-body bg-dark-purple lg:w-96">
					<h2 className="card-title text-3xl">Welcome</h2>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text text-md">First Name</span>
									</div>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full "
										name="firstname"
										value={signupForm.firstname}
										onChange={handleChange}
										required
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text text-md">Last Name</span>
									</div>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full "
										name="lastname"
										value={signupForm.lastname}
										onChange={handleChange}
										required
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text text-md">Email</span>
									</div>
									<input
										type="email"
										placeholder="Type here"
										className="input input-bordered w-full "
										name="email"
										value={signupForm.email}
										onChange={handleChange}
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text text-md">Username</span>
									</div>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full "
										name="username"
										value={signupForm.username}
										onChange={handleChange}
										required
									/>
								</label>
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text text-md">Password</span>
									</div>
									<input
										type="password"
										placeholder="Type here"
										className="input input-bordered w-full "
										name="password"
										value={signupForm.password}
										onChange={handleChange}
										required
									/>
								</label>
							</div>
							<div className="flex flex-col gap-3">
								<button className="btn btn-block btn-primary">Sign up</button>
								<div className=" w-full text-center">
									<p>
										Already have an account?
										<Link to={"../login"}> Log in!</Link>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
