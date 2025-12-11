const ShowModel = require("../models/showModel");
const TheatreModel = require("../models/theatreModel");

exports.addShowByTheatre = async (req, res) => {
    try {
        const { name, date, time, ticketPrice, totalSeats, theatre, movie } = req.body;
        const requiredFields = [name, date, time, ticketPrice, totalSeats, theatre, movie];
        if(requiredFields.some(field => field === undefined || field === null || field === "")) {
            return res.status(400).json({
                success: false,
                message: "Missing input fields."
            });
        }

        let show = await ShowModel.findOne({
            theatre,
            movie,
            date,
            time,
        });

        if(show) {
            return res.status(409).json({
                success: false,
                message: "Show already exists!"
            });
        }

        show = await ShowModel.create(req.body);
        await show.populate("movie");

        return res.status(201).json({
            success: true,
            show: show,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getAllShowsForTheatre = async (req, res) => {
    try {
        const { theatreId } = req.body;
        if(!theatreId) {
            return res.status(400).json({
                success: false,
                message: "Theatre Id is missing."
            });
        }

        const theatre = await TheatreModel.findById(theatreId);
        if(!theatre) {
            return res.status(404).json({
                success: false,
                message: "Theatre doesn't exist."
            });
        }

        const shows = await ShowModel.find({
            theatre: theatreId
        })?.populate("movie");

        return res.status(200).json({
            success: true,
            shows: shows,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateShow = async (req, res) => {
    try {
        const { id } = req.params;

        let show = await ShowModel.findById(id);
        if(!show) {
            return res.status(409).json({
                success: false,
                message: "The show doesn't exist"
            });
        }

        const isShowDuplicate = await ShowModel.findOne({
            theatre: req.body.theatre,
            movie: req.body.movie,
            date: req.body.date,
            time: req.body.time,
        });

        if(isShowDuplicate) {
            return res.status(409).json({
                success: false,
                message: "The updated show already conflicts with an existing show."
            });
        }

        Object.assign(show, req.body);
        await show.save();
        await show.populate("movie");

        return res.status(200).json({
            success: true,
            show: show,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};

exports.getShow = async (req, res) => {
    try {
        const { id } = req.params;

        let show = await ShowModel.findById(id);
        if(!show) {
            return res.status(409).json({
                success: false,
                message: "The show doesn't exist"
            });
        }
        await show.populate([
            { path: "movie" },
            { path: "theatre" }
        ]);

        return res.status(200).json({
            success: true,
            show: show,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};

exports.deleteShow = async (req, res) => {
    try {
        const { id } = req.params;

        let deletedShow = await ShowModel.findByIdAndDelete(id);
        if(!deletedShow) {
            return res.status(404).json({
                success: false,
                message: "The show doesn't exist"
            });
        }

        return res.status(200).json({
            success: true,
            show: deletedShow,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getAllShowsByTheatre = async (req, res) => {
    try {
        const { movie, date } = req.body;
        if(!movie || !date) {
            return res.status(400).json({
                success: false,
                message: "Missing details.",
            });
        }

        const shows = await ShowModel.find({
            movie,
            date
        })
        .populate("theatre")
        .sort({ time: 1});

        const showsByTheatre = {};
        shows.forEach(show => {
            if(!show.theatre) return;
            
            const theatreName = show.theatre.name;
            if(!showsByTheatre[theatreName]) {
                showsByTheatre[theatreName] =[];
            }

            showsByTheatre[theatreName].push(show);
        });

        return res.status(200).json({
            success: true,
            shows: showsByTheatre,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
