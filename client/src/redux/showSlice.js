import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../apiCalls";

export const getAllShowsForTheatreId = createAsyncThunk("show/getAllShowsForTheatre", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/api/shows/getAllShowsForTheatreId", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});
export const getAllShowsByTheatre = createAsyncThunk("show/getAllShowsByTheatre", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/api/shows/getAllShowsByTheatre", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});
export const addShowByTheatreId = createAsyncThunk("show/addShow", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/api/shows/addShowByTheatreId", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});
export const updateShow = createAsyncThunk("show/updateShow", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/api/shows/updateShow/${payload.showId}`, payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});
export const getShow = createAsyncThunk("show/getShow", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/api/shows/getShow/${payload.showId}`);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});
export const deleteShow = createAsyncThunk("show/deleteShow", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/api/shows/deleteShow/${payload.showId}`);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response.data || err.message);
    }
});

const showSlice = createSlice({
    name: "show",
    initialState: {
        singleShow: {
            data: null,
            loading: false,
            error: null,
        },
        allShows: {
            data: null,
            loading: false,
            error: null,
        },
        allShowsByTheatre: {
            data: null,
            loading: false,
            error: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShowsForTheatreId.pending, (state) => {
                state.allShows.data = null;
                state.allShows.loading = true;
                state.allShows.error = null;
            })
            .addCase(getAllShowsForTheatreId.fulfilled, (state, action) => {
                state.allShows.data = action.payload;
                state.allShows.loading = false;
                state.allShows.error = null;
            })
            .addCase(getAllShowsForTheatreId.rejected, (state, action) => {
                state.allShows.data = null;
                state.allShows.loading = false;
                state.allShows.error = action.payload;
            })
            .addCase(getAllShowsByTheatre.pending, (state) => {
                state.allShowsByTheatre.data = null;
                state.allShowsByTheatre.loading = true;
                state.allShowsByTheatre.error = null;
            })
            .addCase(getAllShowsByTheatre.fulfilled, (state, action) => {
                state.allShowsByTheatre.data = action.payload;
                state.allShowsByTheatre.loading = false;
                state.allShowsByTheatre.error = null;
            })
            .addCase(getAllShowsByTheatre.rejected, (state, action) => {
                state.allShowsByTheatre.data = null;
                state.allShowsByTheatre.loading = false;
                state.allShowsByTheatre.error = action.payload;
            })
            .addCase(addShowByTheatreId.pending, (state) => {
                state.singleShow.data = null;
                state.singleShow.loading = true;
                state.singleShow.error = null;
            })
            .addCase(addShowByTheatreId.fulfilled, (state, action) => {
                state.singleShow.data = action.payload;
                state.singleShow.loading = false;
                state.singleShow.error = null;

                state.allShows.data.shows = [...state.allShows.data.shows, action.payload.show];
            })
            .addCase(addShowByTheatreId.rejected, (state, action) => {
                state.singleShow.data = null;
                state.singleShow.loading = false;
                state.singleShow.error = action.payload;
            })
            .addCase(updateShow.pending, (state) => {
                state.singleShow.data = null;
                state.singleShow.loading = true;
                state.singleShow.error = null;
            })
            .addCase(updateShow.fulfilled, (state, action) => {
                state.singleShow.data = action.payload;
                state.singleShow.loading = false;
                state.singleShow.error = null;

                state.allShows.data.shows = state.allShows.data.shows?.map(show => {
                    return show._id === action.payload.show._id ? action.payload.show : show;
                });
            })
            .addCase(updateShow.rejected, (state, action) => {
                state.singleShow.data = null;
                state.singleShow.loading = false;
                state.singleShow.error = action.payload;
            })
            .addCase(getShow.pending, (state) => {
                state.singleShow.data = null;
                state.singleShow.loading = true;
                state.singleShow.error = null;
            })
            .addCase(getShow.fulfilled, (state, action) => {
                state.singleShow.data = action.payload;
                state.singleShow.loading = false;
                state.singleShow.error = null;
            })
            .addCase(getShow.rejected, (state, action) => {
                state.singleShow.data = null;
                state.singleShow.loading = false;
                state.singleShow.error = action.payload;
            })
            .addCase(deleteShow.pending, (state) => {
                state.singleShow.data = null;
                state.singleShow.loading = true;
                state.singleShow.error = null;
            })
            .addCase(deleteShow.fulfilled, (state, action) => {
                state.singleShow.data = action.payload;
                state.singleShow.loading = false;
                state.singleShow.error = null;

                state.allShows.data.shows = state.allShows.data.shows?.filter(show => {
                    return show._id !== action.payload.show._id;
                });
            })
            .addCase(deleteShow.rejected, (state, action) => {
                state.singleShow.data = null;
                state.singleShow.loading = false;
                state.singleShow.error = action.payload;
            })
    }
});

export default showSlice.reducer;

