require('dotenv').config()
const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function encrypt(req, password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash);
            });
        });
    })
}
router.post("/create", async (req, res) => {
    let { username, password } = req.body;


    let password_enc = await encrypt(req, password)
    const newUser = new User({
        username: username, password: password_enc
    })
    //save
    let user_response = await newUser.save();

    console.log(user_response);
    res.send(user_response)
})


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = {
        username: username
    }

    let user_response = await User.findOne({ user })
    bcrypt.compare(password, user_response.password, function (err, result) {
        if (result) {
            let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.send({ accessToken: accessToken })
        }
        else {
            res.send({ err: "Unable to login", errCode: "ERR101" })
        }
    });


})




















module.exports = router;