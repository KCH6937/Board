const express = require('express');
const cors = require('cors'); // 웹 페이지의 스크립트가 그 페이지와 같은 서버에 있는 주소로만 ajax 요청을 할 수 있도록 처리하는 경우를 해제 해주는 기능
const session = require('express-session');
const morgan = require('morgan');
const app = express();

const database = require(__dirname + '/config/database');
const conn = database.init(); // db서버와의 연결 객체를 가지고 있음

database.connect(conn); // db 연결

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'www',
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

// static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));

// routes
app.use('/user', require('./routes/userRouter'));

// Error middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.send('Error 잠시후에 다시 시도해주세요.');
});

// starting the server
app.listen(3001, () => {
    console.log('server started at http://localhost:3001');
});
