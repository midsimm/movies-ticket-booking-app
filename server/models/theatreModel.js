const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const theatreModel = mongoose.model("theatres", theatreSchema);

module.exports = theatreModel;