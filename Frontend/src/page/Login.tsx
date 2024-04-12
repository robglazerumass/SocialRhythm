import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="card bg-base-100 shadow-xl w-full">
			{/* <figure>
				<img
					src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
					alt="Movie"
				/>
			</figure> */}
			<div className="card-body">
				<h2 className="card-title text-3xl">Login</h2>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2">
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-md">Username</span>
							</div>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-md">Password</span>
							</div>
							<input
								type="password"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
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
								<span className="label-text">Remember me</span>
							</div>
							<button className="btn btn-link pr-0">
								Forgot your password?
							</button>
						</label>
					</div>
					<div className="flex flex-col gap-3">
						<button className="btn btn-block btn-primary">Login</button>
						<div>
							<p>
								Don't have an account yet?
								<Link to={"../signup"}> Sign up!</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
