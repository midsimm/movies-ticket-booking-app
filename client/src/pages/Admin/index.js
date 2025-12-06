import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { App as AntdApp, Tabs } from "antd";
import TheatreRequest from "./theatreRequest";
import MoviesList from "./moviesList";

const Admin = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();

    useEffect(() => {
        if(user) {
            if(!user.isAdmin) {
                message.error("User is not a admin");
                navigate("/");
            }
        }
    }, [user, navigate]);

    const items = [
        {
            label: "MoviesList ",
            key: "1",
            children: <MoviesList />
        },
        {
            label: "Theatre request",
            key: "2",
            children: <TheatreRequest />
        }
    ];
    return (
        <div>
            <h1>Welcome admin {user.name}</h1>
            <Tabs items={items} defaultActiveKey="1" />
        </div>
    );
};

export default Admin;