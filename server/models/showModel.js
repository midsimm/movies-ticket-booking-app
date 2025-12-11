const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: {
        type: [Number],
        default: [],
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "theatres",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true,
    }
}, { timestamps: true});

showSchema.index(
    {theatre: 1, movie: 1, date: 1, time: 1},
    {unique: true},
);

const showModel = mongoose.model("shows", showSchema);

module.exports = showModel;