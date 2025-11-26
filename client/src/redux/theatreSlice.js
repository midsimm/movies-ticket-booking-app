import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../apiCalls/index";

export const addTheatre = createAsyncThunk("/theatres/add", async(payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post("api/theatres/add", payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err.message,
            stack: err.stack,
            data: err.response?.data
        });
    }
});

export const updateTheatre = createAsyncThunk("/theatres/update", async(payload, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/api/theatres/update/${payload.id}`, payload);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err.message,
            stack: err.stack,
            data: err.response?.data
        });
    }
});

export const deleteTheatre = createAsyncThunk("/theatres/delete", async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/api/theatres/delete/${payload.id}`);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: err.message,
            stack: err.stack,
            data: err.response.data
        })
    }
});

export const fetchTheatres = createAsyncThunk("/theatres/fetch", async ( _payload, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/api/theatres/all");
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
    name: "theatres",
    initialState: {
        allTheatres: {
            data: null,
            loading: null,
            error: null
        },
        singleTheatre: {
            data: null,
            loading: null,
            error: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // reducers for adding a theatre
            .addCase(addTheatre.pending, (state) => {
                state.singleTheatre.data = null;
                state.singleTheatre.loading = true;
                state.singleTheatre.error = null;
            })
            .addCase(addTheatre.fulfilled, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = action.payload;
                state.singleTheatre.error = null;

                state.allTheatres.data = [...(state.allTheatres.data || []), action.payload];
            })
            .addCase(addTheatre.rejected, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = null;
                state.singleTheatre.error = action.payload || action.error;
            })
        // reducers for updating a theatre
            .addCase(updateTheatre.pending, (state) => {
                state.singleTheatre.data = null;
                state.singleTheatre.loading = true;
                state.singleTheatre.error = null;
            })
            .addCase(updateTheatre.fulfilled, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = action.payload;
                state.singleTheatre.error = null;

                state.allTheatres.data = state.allTheatres.data.map(theatre => theatre._id === action.payload._id ? action.payload : theatre);
            })
            .addCase(updateTheatre.rejected, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = null;
                state.singleTheatre.error = action.payload || action.error;
            })
        // reducers for deleting a theatre
            .addCase(deleteTheatre.pending, (state) => {
                state.singleTheatre.data = null;
                state.singleTheatre.loading = true;
                state.singleTheatre.error = null;
            })
            .addCase(deleteTheatre.fulfilled, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = action.payload;
                state.singleTheatre.error = null;

                state.allTheatres.data = state.allTheatres.data.filter(theatre => theatre._id !== action.payload.id);
            })
            .addCase(deleteTheatre.rejected, (state, action) => {
                state.singleTheatre.loading = false;
                state.singleTheatre.data = null;
                state.singleTheatre.error = action.payload || action.error;
            })
        // reducers for fetching all theatres
            .addCase(fetchTheatres.pending, (state) => {
                state.allTheatres.data = null;
                state.allTheatres.loading = true;
                state.allTheatres.error = null;
            })
            .addCase(fetchTheatres.fulfilled, (state, action) => {
                state.allTheatres.loading = false;
                state.allTheatres.data = action.payload;
                state.allTheatres.error = null;
            })
            .addCase(fetchTheatres.rejected, (state, action) => {
                state.allTheatres.loading = false;
                state.allTheatres.data = null;
                state.allTheatres.error = action.payload || action.error;
            })
    }
});

export default theatreSlice.reducer;
