import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../apiCalls";


export const addMovie = createAsyncThunk("movie/addMovie", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/api/movies/addMovie", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const updateMovie = createAsyncThunk("movie/updateMovie", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/api/movies/updateMovie/${payload._id}`, payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/api/movies/deleteMovie/${payload._id}`);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchAllMovies = createAsyncThunk("movie/fetchAllMovies", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/api/movies/fetchAllMovies");
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        singleMovie: {
            data: null,
            loading: false,
            error: null,
        },
        allMovies: {
            data: null,
            loading: false,
            error: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMovie.pending, (state) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = true;
                state.singleMovie.error = null;
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.singleMovie.data = action.payload;
                state.singleMovie.loading = false;
                state.singleMovie.error = null;

                state.allMovies.data.movies = [...state.allMovies.data.movies, action.payload.movie];
            })
            .addCase(addMovie.rejected, (state, action) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = false;
                state.singleMovie.error = action.payload;
            })
            .addCase(updateMovie.pending, (state) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = true;
                state.singleMovie.error = null;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.singleMovie.data = action.payload;
                state.singleMovie.loading = false;
                state.singleMovie.error = null;

                state.allMovies.data.movies = state.allMovies.data.movies.map(movie => (
                    movie._id === action.payload.movie._id ? action.payload.movie : movie
                ));
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = false;
                state.singleMovie.error = action.payload;
            })
            .addCase(deleteMovie.pending, (state) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = true;
                state.singleMovie.error = null;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.singleMovie.data = action.payload;
                state.singleMovie.loading = false;
                state.singleMovie.error = null;

                state.allMovies.data.movies = state.allMovies.data.movies.filter(movie => (
                    movie._id !== action.payload.id
                ));
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.singleMovie.data = null;
                state.singleMovie.loading = false;
                state.singleMovie.error = action.payload;
            })
            .addCase(fetchAllMovies.pending, (state) => {
                state.allMovies.data = null;
                state.allMovies.loading = true;
                state.allMovies.error = null;
            })
            .addCase(fetchAllMovies.fulfilled, (state, action) => {
                state.allMovies.data = action.payload;
                state.allMovies.loading = false;
                state.allMovies.error = null;
            })
            .addCase(fetchAllMovies.rejected, (state, action) => {
                state.allMovies.data = null;
                state.allMovies.loading = false;
                state.allMovies.error = action.payload;
            })
    }
});

export default movieSlice.reducer;