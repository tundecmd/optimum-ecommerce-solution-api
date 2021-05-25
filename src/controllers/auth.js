const User = require("../models/user");
const bcrypt =  require("bcrypt");
const mongoose = require("mongoose")


exports.signup = (req, res) => {
    //console.log('hiiiiii');
    User.findOne({ email: req.body.email })
        .exec( async (error, user) => {
                if (user) {
                    return res.status(400).json({
                        message: "user already registered"
                    })
                }

                const {
                    firstName,
                    lastName,
                    email,
                    password
                } = req.body;

                const hash_password = await bcrypt.hash(password, 10)

                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    password: hash_password,
                    username: email.split("@")[0]
                });
        
                _user.save((error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: error
                        });
                    }
        
                    if (data) {
                        return res.status(201).json({
                            message: data
                        })
                    }
                })
            }
        )
}