import { ReactNode } from "react";

function MenuItems({ icon, name }: { icon: ReactNode; name: string }) {
	return (
		<li>
			<a className="flex justify-start gap-7 text-black">
				{icon}
				{name}
			</a>
		</li>
	);
}

function MenuBar2({ createPostForm }: { createPostForm: JSX.Element }) {
	return (
		<div className="sticky top-0 left-0 lg:w-64 h-screen">
			<ul className="menu bg-base-200 w-full h-full flex justify-around">
				<div>
					<MenuItems
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						}
						name="Search"
					/>
					<MenuItems
						icon={
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
									d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
								/>
							</svg>
						}
						name="Friends"
					/>
					<MenuItems
						icon={
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
									d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
								/>
							</svg>
						}
						name="Trending"
					/>
					<li>
						<button
							className="bg-base-200 hover:border-transparent"
							onClick={() =>
								document.getElementById("create_post_modal").showModal()
							}>
							<a
								className="flex justify-start gap-7 text-black"
								// onClick={() =>
								// 	document.getElementById("create_post_modal").showModal()
								// }
							>
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
										d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								Create Post
							</a>
							<dialog id="create_post_modal" className="modal">
								{createPostForm}
							</dialog>
						</button>
					</li>
				</div>
			</ul>
		</div>
	);
}

export default MenuBar2;
