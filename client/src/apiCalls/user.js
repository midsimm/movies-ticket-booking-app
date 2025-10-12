import { axiosInstance } from "./index";

export const registerUser = async (registerUserData) => {
    const response = await axiosInstance.post("/api/users/register", registerUserData);
    return response.data;
};

export const loginUser = async (loginUserData) => {
    const response = await axiosInstance.post("/api/users/login", loginUserData);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/api/users/getCurrentUser");
    return response.data;
};