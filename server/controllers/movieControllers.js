const MovieModel = require("../models/movieModel");

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find({});
        return res.json({
            success: true,
            movies: movies,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while getting all movies: ${err}`
        });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await MovieModel.findByIdAndUpdate(movieId, { $set: req.body}, { new: true });

        if(!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found!"
            });
        }

        return res.json({
            success: true,
            movie: movie
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while updating the movie: ${err}`
        });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await MovieModel.findByIdAndDelete(movieId);

        if(!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found!"
            });
        }

        return res.json({
            success: true,
            id: movieId,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while deleting the movie: ${err}`
        });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const movie = await MovieModel.create(req.body);
        return res.status(201).json({
            success: true,
            movie: movie,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while adding a movie: ${err}`
        });
    }
};

