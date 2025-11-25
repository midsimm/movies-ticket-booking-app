import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../apiCalls/user";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { Layout, Menu, App as AntdApp } from "antd";
import { Header } from "antd/es/layout/layout";
import {
    HomeOutlined,
    UserOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const { message } = AntdApp.useApp();
    const hasFetchedUser = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        {
            label: (
                <span onClick={() => navigate("/")}>
                    Home
                </span>
            ),
            key: "home",
            icon: <HomeOutlined />,
        },

        {
            label: `${user ? user.name : " "}`,
            key: "user",
            icon: <UserOutlined />,

            children: [
                {
                    label: (
                        <span onClick={() => user.isAdmin ? navigate("/admin") : navigate("/profile")}>
                            My Profile
                        </span>
                    ),
                    key: "profile",
                    icon: <ProfileOutlined />,
                },
                {
                    label: (
                        <Link to="/login" onClick={() => localStorage.removeItem("token")}>
                            Log out
                        </Link>
                    ),
                    key: "logout",
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    const isValidUser = async () => {
        try {
            dispatch(showLoader());
            hasFetchedUser.current = true;
            const response = await getCurrentUser();
            dispatch(hideLoader());
            if (response.success) {
                dispatch(setUser(response.user));
                return true;
            } else {
                message.error(response.message);
                return false;
            }
        } catch (error) {
            message.error(error.message);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(hasFetchedUser.current === true) return;
        if (!token || !isValidUser()) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        user && (
            <>
                <Layout>
                    <Header
                        className="d-flex justify-content-between"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                            Book My Show
                        </h3>
                        <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
                    </Header>

                    <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                        {children}
                    </div>
                </Layout>
            </>
        )
    )
};

export default ProtectedRoute;