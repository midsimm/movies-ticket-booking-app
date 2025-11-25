import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { App as AntdApp } from "antd";

const Admin = () => {
    const { data } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();

    useEffect(() => {
        if(!data?.user.isAdmin) {
            message.error("User is not a admin");
            navigate("/");
        }
    }, [data, navigate]);

    return (
        <div>
            Admin Page
        </div>
    );
};

export default Admin;