import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import theatreReducer from "./theatreSlice";
import movieReducer from "./movieSlice";
import showReducer from "./showSlice";

const store = configureStore({
    reducer: { 
        loader: loaderReducer,
        user: userReducer,
        theatre: theatreReducer,
        movie: movieReducer,
        show: showReducer,
    }
});

export default store;