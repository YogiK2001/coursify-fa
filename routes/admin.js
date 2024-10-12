const express = require('express');
const app = express();
const { Router, application } = require('express');
const adminRouter = Router();
const { User, Course, Admin, Purchase } = require('../database/db');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require('dotenv').config();

app.use(express.json());

async function generateHash(password) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash.toString();
}

adminRouter.post('/signup', async function (req, res) {
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

            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(409).json({ message: "Admin already exists" });
            }

            let hash = await generateHash(password);

            const newAdmin = await Admin.create({
                email: email,
                password: hash,
                firstName: firstName,
                lastName: lastName
            })

            const token = jwt.sign({
                id: newAdmin._id.toString()
            }, process.env.JWT_ADMIN_SECRET)

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

adminRouter.post('/signin', async function (req, res) {
    try {
        const requiredResponse = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string().min(5).max(50),
        });

        const parsedData = requiredResponse.safeParse(req.body);
        if (parsedData.success) {
            const { email, password } = parsedData.data;

            const user = await Admin.findOne({
                email: email,
            });


            const passwordMatch = await bcrypt.compare(password, user.password);

            if (user && passwordMatch) {
                const token = jwt.sign({
                    id: user._id.toString()
                }, process.env.JWT_ADMIN_SECRET);

                res.status(200).json({
                    message: "Logged in successfully",
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




adminRouter.post('/course', function (req, res) {
    res.json({
        message: "You purchaesd courses"
    })
})

// Middlware call

adminRouter.post('/course', function (req, res) {
    res.json({
        message: "You bought this course"
    })
})

adminRouter.put('/', function (req, res) {
    res.json({
        message: "You bought this course"
    })
})

adminRouter.get('/bulk', function (req, res) {
    res.json({
        message: "You bought this course"
    })
})



module.exports = {
    adminRouter: adminRouter
}