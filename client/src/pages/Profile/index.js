import { useSelector } from "react-redux";
import { Tabs } from "antd";
import TheatreList from "./theatreList";
import Bookings from "../BookingPage";

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const items = [
        {
            key: "1",
            label: "Theatres",
            children: <TheatreList />
        },
        {
            key: "2",
            label: "Bookings",
            children: <Bookings />
        }
    ]
    return (
        <div>
            <h1>Welcome {user?.name}, to your profile!</h1>
            <Tabs items={ items } defaultActiveKey="1" />
        </div>
    );
}

export default Profile;