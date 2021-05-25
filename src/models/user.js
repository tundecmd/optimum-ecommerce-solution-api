const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {
    timestamps: true
})


userSchema.methods = {
    authentication: async function (password) {
        return await bcrypt.compare(password, this.password)
    }
}

userSchema.virtual("fullName")
            .get(function () {
                return `${this.firstName} ${this.lastName}`;
            })





module.exports = mongoose.model("User", userSchema);