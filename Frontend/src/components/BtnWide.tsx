import MyBtnType from "../../interface/interface";

function BtnWide(props: MyBtnType) {
	return (
		<button
			className={`btn bg-purple-btn border-none text-white shadow-none justify-start gap-7 ${props.classNameStyle} hover:bg-primary hover:bg-opacity-30 hover:text-[#646cff]`}
			onClick={() => document.getElementById("create_post_modal").showModal()}>
			{/* <a
							className="flex justify-start gap-7 text-black"
							// onClick={() =>
							// 	document.getElementById("create_post_modal").showModal()
							// }
						> */}
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
			{/* </a> */}
		</button>
	);
}
