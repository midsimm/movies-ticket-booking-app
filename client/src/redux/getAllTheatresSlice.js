import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../apiCalls/index";

export const fetchTheatres = createAsyncThunk("/theatres/fetch", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance("/api/theatres/all", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err.message,
            stack: err.stack,
            data: err.response.data
        });
    }
});

const theatreSlice = createSlice({
    name: "getAlltheatres",
    initialState: {
        data: null,
        loading: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheatres.pending, (state) => {
                state.data = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTheatres.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchTheatres.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || action.error;
            })
    }
});

export default theatreSlice.reducer;
