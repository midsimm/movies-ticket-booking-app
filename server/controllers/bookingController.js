const BookingModel = require('../models/bookingModel');
const ShowModel = require('../models/showModel');

exports.createBooking = async (req, res) => {
    try {
        const { showId, seats } = req.body;
        if(!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid input fields."
            });
        }

        const show = await ShowModel.findById(showId);
        if(!show) {
            return res.status(404).json({
                success: false,
                message: "Show not found."
            });
        }

        const alreadyBookedSeats = show.bookedSeats;
        const overlappingSeats = seats.filter(seat => alreadyBookedSeats.includes(seat));
        if(overlappingSeats.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Seats already booked: ${overlappingSeats.join(", ")}`
            });
        }

        // Calculate total price
        const totalPrice = seats.length * show.ticketPrice;

        // Create booking
        await BookingModel.create({
            show: showId,
            seats,
            totalPrice,
        });

        // Update booked seats in show
        show.bookedSeats.push(...seats);
        await show.save();

        return res.status(201).json({
            success: true,
            show: showId,
            seats,
            totalPrice,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};