const express = require("express");
const userRoutes = require("./routers/userRouters");
const theatreRoutes = require("./routers/theatreRouters");
const movieRoutes = require("./routers/movieRouters");
const showRoutes = require("./routers/showRouter");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);

// connect to MongoDB
mongoose.connect("mongodb+srv://simranjeets:13npozpoxm9dUe34@cluster0.kashzhe.mongodb.net/MDB?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

// listen to PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});