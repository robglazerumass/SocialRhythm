import FeedImage from '../components/FeedImage';
import Interaction from '../components/Interaction';

export default function Feed() {

    return(
        <div >
            {/* <MenuBar /> */}
            {/* Add other components like title and description into the div below*/}
            <div className="temp-feed-view h-full overflow-y-scroll w-full flex flex-col items-center box-border">
            <FeedImage />
            <Interaction />
            </div>
        </div>
    );
}