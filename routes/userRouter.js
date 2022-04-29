const express = require('express');

const router = express.Router();

router.post("/join", async (req, res) => {
    try {
        const userInfo = {
            id: req.body.id,
            password: req.body.password,
        }
        console.log("성공");
        res.json({message: true, id: userInfo.id, password: userInfo.password});
    } catch (err) {
        console.log(err);
        res.json({message : false});
    }

});

module.exports = router;