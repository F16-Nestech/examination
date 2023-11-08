const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express()
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connection successful!"))
    .catch((err) => {
        console.log(err)
    });

app.use(express.json());
// app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend API is running PORT 5000")
})