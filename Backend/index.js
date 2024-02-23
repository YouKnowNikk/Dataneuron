const dotenv = require("dotenv");
const connectDB = require("./db/index.js");
const { app } = require("./app.js");

dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`app is running at ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Mongo DB connection failed", error);
    });
