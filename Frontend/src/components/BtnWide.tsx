import { MyBtnType } from "../../interface/interface";

function BtnWide(props: MyBtnType) {
	return (
		<button
			className={`btn btn-wide bg-purple-btn border-none text-white shadow-none justify-center gap-7 ${props.classNameStyle} hover:bg-primary hover:bg-opacity-30 hover:text-[#646cff]`}
			onClick={props.eventClick}>
			{/* <a
							className="flex justify-start gap-7 text-black"
							// onClick={() =>
							// 	document.getElementById("create_post_modal").showModal()
							// }
						> */}
			{props.children}
			{props.name}
			{/* </a> */}
		</button>
	);
}

export default BtnWide;
