const express = require('express');
const router = express.Router();

const database = require('../config/database');
const conn = database.init(); // db서버와의 연결 객체를 가지고 있음

router.post("/join", async (req, res) => {
    const userInfo = {
        id: req.body.id,
        password: req.body.password,
    }
    
    if(userInfo.id && userInfo.password) {
        console.log("성공");
        
        const query = `INSERT INTO USER VALUES(${id}, ${password})`;
        console.log(query);

        conn.query(query, function(err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
        
        res.json({code: 200, message: "회원가입을 환영합니다!"});

    } else {
        res.json({code: 500, message: "error"});
    }
        
});

module.exports = router;