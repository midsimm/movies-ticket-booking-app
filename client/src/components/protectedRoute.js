import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../apiCalls/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isValidUser = async () => {
        try {
            dispatch(showLoader());
            const response = await getCurrentUser();
            dispatch(hideLoader());
            if (response.success) {
                dispatch(setUser(response.user));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error validating user:", error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !isValidUser()) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            {children}
        </div>
    )
};

export default ProtectedRoute;