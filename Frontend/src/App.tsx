import { Link, Outlet } from "react-router-dom";
import BtnWide from "./components/BtnWide";
import AuthProvider from "./service/AuthProvider";

function App() {
	return (
		<AuthProvider>
			<Outlet />
			<div className="flex flex-col justify-center gap-7 items-center">
				<h1>Welcome to Social Rhythm</h1>
				<div className="flex flex-col gap-4 justify-center items-center">
					<Link to={"./login"}>
						<BtnWide
							name="Login"
							classNameStyle=""
							children={undefined}
							eventClick={undefined}></BtnWide>
					</Link>
					<Link to={"./signup"}>
						<BtnWide
							name="Signup"
							classNameStyle=""
							children={undefined}
							eventClick={undefined}></BtnWide>
					</Link>
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
