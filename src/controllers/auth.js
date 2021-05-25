const User = require("../models/user");
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
    
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

                const hashedPassword = await bcrypt.hash(password, 10)

                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
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

exports.signin = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec(
            (error, user) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                    if (user) {
                        if (user.authentication(req.body.password)) {
                            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" })
                            const { _id, firstName, lastName, email, username, role, fullName } = user;
                            res.status(200).json({
                                token,
                                user: {
                                    _id, firstName, lastName, email, username, role, fullName
                                }
                            })
                        } else {
                            return res.status(400).json({
                                message: "Invalid Password"
                            })
                        }
                    } else {
                        return res.status(400).json({ message: "Something went wrong" })
                    }
            }
        )

} 