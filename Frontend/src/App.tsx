import { Link } from "react-router-dom";

function App() {
	return (
		<div className="flex flex-col justify-center gap-7">
			<h1>Welcome to Social Rhythm</h1>
			<div className="flex flex-col gap-4 justify-center items-center">
				<Link to={"login"}>
					<button className="btn btn-wide">Login</button>
				</Link>
				<button className="btn btn-wide">Sign-up</button>
			</div>
		</div>
	);
}

export default App;
