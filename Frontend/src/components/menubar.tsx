import { ReactNode } from "react";

function MenuBar({ component }: { component: ReactNode }) {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				{component}
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden">
					Open drawer
				</label>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
					{/* Sidebar content here */}
					<li>
						<a>Search</a>
					</li>
					<li>
						<a>Friends</a>
					</li>
					<li>
						<a>Trending</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MenuBar;
