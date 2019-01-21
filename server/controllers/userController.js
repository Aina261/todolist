const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    // ======================================
    //           REGISTER USER
    // ======================================
    register (req, res) {

        // Check if userName or email was already use
        User.findOne({
            $or: [{email: req.body.email}, {userName: req.body.userName}]
        }).then( user => {
            if (!user) {
                const {userName} = req.body;
                const {email} = req.body;
                const passwordClear = req.body.password;
                const password = bcrypt.hashSync(passwordClear, saltRounds);

                console.log(password);

                const user = new User({
                    userName,
                    email,
                    password
                });

                user.save()
                    .then( () => {
                        res.status(200).json({
                            "userCreate": true
                        })
                    })
                    .catch( err => {
                        res.send(err)
                    })
            } else {
                res.status(403).json({
                    "userCreate": false
                })
            }
        });
    },


    // ======================================
    //              LOGIN USER
    // ======================================
    login (req, res) {
        const {userName} = req.body;
        const {password} = req.body;

        User.findOne({
            userName: userName
        })
            .then( user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        res.status(200).json({
                            "userLogin": true,
                            user
                        })
                    } else {
                        res.send({"userLogin": false})
                    }
                } else {
                    res.send({"userLogin": false})
                }
            })
    },


    // ======================================
    //            GET USERNAME
    // ======================================
    getUserName (req, res) {
        User.find()
            .then( (users) => {
                res.json(users)
            })
            .catch( err => {
                res.send(err)
            })
    }
};