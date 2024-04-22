import { Link } from 'react-router-dom'
import signup_img from "../assets/signup_img.jpg"
import MenuBar from '../components/menubar';
import FeedImage from '../components/FeedImage';

export default function Feed() {

    return(
        <div >
            {/* <MenuBar /> */}
            <FeedImage />
        </div>
    );
}