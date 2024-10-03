require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mealRouter = require("./routes/meal");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");
const mongoConnect = require("./connection/mongoConnection");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const PORT = process.env.PORT || 8001;

var corsOptions = {
    // origin: [process.env.FRONTEND_BASE_URL | "http://localhost:5173"],
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
};

// const corsOptions = {
//     origin: function (origin, callback) {
//         // const allowedOrigins = [process.env.FRONTEND_BASE_URL, "http://localhost:5173"].filter(Boolean);
//         const allowedOrigins = "http://localhost:5173";
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,  // This allows credentials (cookies, etc.) to be sent
//     optionsSuccessStatus: 200
// };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const mongoUser = encodeURIComponent(process.env.MONGO_USER);
const mongoPass = encodeURIComponent(process.env.MONGO_PASS);
const mongoDB = process.env.MONGO_CLUSTER;
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoDB}/?retryWrites=true&w=majority&appName=theMeal`;

mongoConnect(mongoUrl).then(() => console.log("mongoDb is connected"));

app.get("/", (req, res) => {
    res.send("App is working!");
});

// auth the user
app.get("/authuser", auth, (req, res) => {
    console.log('this is running')
    res.status(200).send("OK");
});

// user login and sign up
app.use("/api/users", userRouter);
// user data after logged-in
// app.use("/api/users/profile");
app.use("/api/meals", mealRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log("listening on PORT : ", PORT));
