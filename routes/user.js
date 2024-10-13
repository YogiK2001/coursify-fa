require('dotenv').config();
const express = require('express');
const app = express();
const { Router } = require('express');
const userRouter = Router();
const { User, Course, Admin, Purchase } = require('../database/db');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authUser } = require("../middleware/user");
const course = require('./course');

app.use(express.json());

async function generateHash(password) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash.toString();
}



userRouter.post('/signup', async function (req, res) {
    try {
        const requiredResponse = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        });

        const parsedData = requiredResponse.safeParse(req.body);
        if (parsedData.success) {
            const { email, password, firstName, lastName } = parsedData.data;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            let hash = await generateHash(password);

            const newUser = await User.create({
                email: email,
                password: hash,
                firstName: firstName,
                lastName: lastName
            })

            const token = jwt.sign({
                id: newUser._id.toString()
            }, process.env.JWT_USER_SECRET)

            res.status(200).json({
                message: "Congratulations! You have signed up",
                token: token
            })
        } else {
            res.status(403).json({
                message: "Inavid Email or Password"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to Signup! "
        });
        console.error(err);
    }
})

userRouter.post('/signin', async function (req, res) {
    try {
        const requiredResponse = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string().min(5).max(50),
        });

        const parsedData = requiredResponse.safeParse(req.body);
        if (parsedData.success) {
            const { email, password } = parsedData.data;

            const user = await User.findOne({
                email: email,
            });


            const passwordMatch = await bcrypt.compare(password, user.password);

            if (user && passwordMatch) {
                const token = jwt.sign({
                    id: user._id.toString()
                }, process.env.JWT_USER_SECRET);

                res.status(200).json({
                    message: "User Logged in successfully",
                    token: token
                })
            } else {
                res.status(403).json({
                    message: "Incorrect creds"
                })
            }
        } else {
            res.status(403).json({
                message: "Invalid credentials"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to Signin"
        });
        console.error(err);
    }
})



userRouter.get('/purchases', authUser, async function (req, res) {
    const userId = req.userId;

    const purchases = await Purchase.find({
        userId
    })

    let purchasedCourseIds = [];

    for (let i = 0; i < purchases.length; i++) {
        purchasedCourseIds.push(purchases[i].courseId)
    }
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}