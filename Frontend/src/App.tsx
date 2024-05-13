import { Link } from "react-router-dom";
import BtnWide from "./components/BtnWide";

function App() {
	return (
		<div className="flex flex-col justify-center gap-7 items-center">
			<h1>Welcome to Social Rhythm</h1>
			<div className="flex flex-col gap-4 justify-center items-center">
				<Link to={"login"}>
					<BtnWide
						name="Login"
						classNameStyle=""
						children={undefined}
						eventClick={undefined}></BtnWide>
				</Link>
				<Link to={"signup"}>
					<BtnWide
						name="Signup"
						classNameStyle=""
						children={undefined}
						eventClick={undefined}></BtnWide>
				</Link>
			</div>
		</div>
	);
}

export default App;
