function MenuBar() {
    return(
    <div className="drawer">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
    </div> 
    <div className="drawer-side z-10">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        {/* Sidebar content here */}
        <li><a>Search</a></li>
        <li><a>Friends</a></li>
        <li><a>Trending</a></li>
        </ul>
    
    </div>
    </div>
    );
}

export default MenuBar;


