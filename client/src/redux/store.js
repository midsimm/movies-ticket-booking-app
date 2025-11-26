import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import theatreReducer from "./theatreSlice";

const store = configureStore({
    reducer: { 
        loader: loaderReducer,
        user: userReducer,
        theatre: theatreReducer,
    }
});

export default store;