import { axiosInstance } from "../apiCalls";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateShowBookings } from "./showSlice";


export const makePayment = createAsyncThunk("booking/makePayment", async (payload, thunkAPI) => {
    try{
        const response = await axiosInstance.post('/api/bookings/make-payment', {token: payload.token, amount: payload.amount});
        return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

export const bookShow = createAsyncThunk("booking/bookShow", async (payload, thunkAPI) => {
    try{
        const response = await axiosInstance.post('/api/bookings/book-show', payload);
        thunkAPI.dispatch(updateShowBookings({
            showId: payload.show,
            seats: payload.seats,
        }));
        return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

export const getAllBookings = createAsyncThunk("", async (_payload, thunkAPI) => {
    try{
        const response = await axiosInstance.get('/api/bookings/get-all-bookings');
        return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        newBooking: {
            data: null,
            loading: false,
            error: null,
        },
        payment: {
            data: null,
            loading: false,
            error: null,
        },
        allBookings: {
            data: null,
            loading: false,
            error: null,
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookShow.pending, (state) => {
                state.newBooking.loading = true;
                state.newBooking.error = null;
                state.newBooking.data = null;
            })
            .addCase(bookShow.fulfilled, (state, action) => {
                state.newBooking.loading = false;
                state.newBooking.data = action.payload;
                state.newBooking.error = null;
            })
            .addCase(bookShow.rejected, (state, action) => {
                state.newBooking.loading = false;
                state.newBooking.error = action.payload;
                state.newBooking.data = null;
            })
            .addCase(makePayment.pending, (state) => {
                state.payment.loading = true;
                state.payment.error = null;
                state.payment.data = null;
            })
            .addCase(makePayment.fulfilled, (state, action) => {
                state.payment.loading = false;
                state.payment.data = action.payload;
                state.payment.error = null;
            })
            .addCase(makePayment.rejected, (state, action) => {
                state.payment.loading = false;
                state.payment.error = action.payload;
                state.payment.data = null;
            })
            .addCase(getAllBookings.pending, (state) => {
                state.allBookings.loading = true;
                state.allBookings.error = null;
                state.allBookings.data = null;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.allBookings.loading = false;
                state.allBookings.data = action.payload;
                state.allBookings.error = null;
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.allBookings.loading = false;
                state.allBookings.error = action.payload;
                state.allBookings.data = null;
            })
    },
});

export default bookingSlice.reducer;