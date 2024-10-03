const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            quantity: {
                type: String,
                required: true,
            },
            mealId: {
                type: String,
                required: true,
            },
            mealImage: {
                type: String,
                required: true,
            },
            mealName: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true
            }
        },
    ],
    order: [
        {
            quantity: {
                type: String,
                required: true,
            },
            mealId: {
                type: String,
                required: true,
            },
            mealImage: {
                type: String,
                required: true,
            },
            mealName: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true
            }
        },
    ],
    // TODO : Add more entity for card and order
});

const User = mongoose.model("User", userSchema);
module.exports = User;
