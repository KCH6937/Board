const express = require('express');
const router = express.Router();

const database = require('../config/database');
const conn = database.init(); // db서버와의 연결 객체를 가지고 있음

router.post("/join", (req, res) => {
    try {
        const userInfo = {
            id: req.body.id,
            pw: req.body.pw
        };
        console.log(userInfo);

        if(userInfo.id && userInfo.pw) {
            const query = `INSERT INTO USER VALUES("${userInfo.id}", "${userInfo.pw}")`;
            console.log(query);

            conn.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    res.json({ code:501, message: "DB Connection Error" });
                } else {
                    console.log(result);                    
                    res.json({ code: 200, message: "회원가입을 환영합니다!" });
                }
            });
        } else {
            res.json({ code: 400, message: "ID 또는 비밀번호를 확인해주세요!" });
        }
        
    } catch(err) {
        console.log("server error");
        console.log(err);

        res.json({code: 500, message: "server error!"});
    }
});

router.get("/login", (req, res) => {
    try {
        const userInfo = {
            id: req.body.id,
            pw: req.body.pw
        };
        console.log(userInfo);

        if(userInfo.id && userInfo.pw) {
            const query = `SELECT id, password FROM USER WHERE id="${req.body.id}" AND password="${req.body.pw}"`;

            conn.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err);

                    res.json({ code:501, message: "DB Connection Error" });
                } else {
                    console.log(result);

                    if(result[0]) {
                        res.json({ code: 200, message: "로그인 성공!" });
                    } else {
                        res.json({ code: 400, message: "ID 또는 비밀번호를 확인해주세요!" });
                    }                    
                }
            });
            
        } else {
            res.json({ code: 400, message: "ID 또는 비밀번호 필드를 입력해주세요!" });
        }

    } catch(err) {
        console.log("server error");
        console.log(err);

        res.json({ code: 500, message: "server error!" });
    }
});

router.post("/edit", (req, res) => {
    try {
        const userInfo = {
            id: req.body.id,
            pw: req.body.pw,
            changePw: req.body.changePw
        };
        console.log(userInfo);

        if(userInfo.id && userInfo.pw && userInfo.changePw) {
            const query = `UPDATE USER SET password="${userInfo.changePw}" WHERE id="${req.body.id}" AND password="${req.body.pw}"`;

            conn.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err);

                    res.json({ code: 501, message: "DB Connection Error" });
                } else {
                    console.log(result);
                    res.json({ code: 200, message: "비밀번호 변경 성공!" });
                }
            });

        } else {
            res.json({ code: 400, message: "ID,비밀번호, 바꿀 비밀번호 필드를 입력해주세요!" });
        }

    } catch(err) {
        console.log("server error");
        console.log(err);

        res.json({ code: 500, message: "server error!" });
    }
});

router.get('/delete', (req, res) => {
    try {
        const userInfo = {
            id: req.body.id,
            pw: req.body.pw
        };
        console.log(userInfo);

        if(userInfo.id && userInfo.pw) {
            const query = `DELETE FROM USER WHERE id="${userInfo.id}" AND password="${userInfo.pw}"`;

            conn.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err);
                    res.json({ code: 501, message: "DB Connection Error" });
                } else {
                    console.log(result);
                    if(result.affectedRows) {
                        res.json({ code: 200, message: "계정 삭제 완료!" });
                    } else {
                        res.json({ code: 400, message: "ID 또는 비밀번호를 확인해주세요!" });
                    }                    
                }
            });

        } else {
            res.json({ code: 400, message: "ID,비밀번호, 바꿀 비밀번호 필드를 입력해주세요!" });
        }

    } catch(err) {
        console.log("server error");
        console.log(err);

        res.json({ code: 500, message: "server error!" });
    }
});

module.exports = router;