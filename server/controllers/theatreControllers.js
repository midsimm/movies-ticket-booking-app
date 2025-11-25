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
            address: address
        });

        return res.json({
            success: true,
            message: "Theatre is added successfully.",
            theatre: theatre
        });
    } catch (err) {
        return res.json({
            success: failure,
            message: `Error occured: ${err}`
        });
    }
};