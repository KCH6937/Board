const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "www",
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/userRouter"));

app.listen(3001, () => {
    console.log("server started at http://localhost:3001");
});

