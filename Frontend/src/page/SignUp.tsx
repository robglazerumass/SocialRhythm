import { Link } from 'react-router-dom'
import signup_img from "../assets/signup_img.jpg"

export default function SignUp() {
  return (
   <div className='flex items-center justify-center'>
     <div className="flex flex-row bg-base-100 w-full shadow-xl h-5/6 lg:w-5/6 rounded-lg">
        <div className='flex w-0 lg:w-3/5'>
            <img className='rounded-l-lg object-cover' src={signup_img} alt="party"/>
        </div>
			<div className="card-body lg:w-96">
				<h2 className="card-title text-3xl">Welcome</h2>
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
                                required
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
                                required
							/>
						</label>
					</div>
					<div className="flex flex-col gap-3">
						<button className="btn btn-block btn-primary">Login</button>
						<div className=' w-full text-center'>
							<p>
								Already have an account?
								<Link to={"../login"}> Log in!</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
   </div>
  )
}
