const TheatreModel = require("../models/theatreModel");

exports.addTheatre = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email || !phone || !address) {
            return res.json({
                success: false,
                message: "Kindly provide all details to add theatre."
            });
        }

        const theatre = await TheatreModel.create({
            name: name,
            email: email,
            phone: phone,
            address: address,
            owner: req.userId,
        });

        return res.json({
            success: true,
            message: "Theatre is added successfully.",
            theatre: theatre
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `Error occured: ${err}`
        });
    }
};

exports.updateTheatre = async (req, res) => {
    try {
        const id = req.params.id;
        const theatre = await TheatreModel.findByIdAndUpdate(id, req.body, {new: true});

        return res.json({
            success: true,
            message: "Theatre updated successfully.",
            theatre: theatre
        })
    } catch (err) {
        return res.json({
            success: false,
            message: `Error occurred: ${err}`
        });
    }
};

exports.deleteTheatre = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await TheatreModel.findByIdAndDelete(id);

        if(!deleted) {
            return res.json({
                success: false,
                message: "Theatre not found!"
            })
        }

        return res.json({
            success: true,
            message: "Theatre deleted successfuly.",
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `Error occurred: ${err}`
        })
    }
};