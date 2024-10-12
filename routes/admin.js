const { Router, application } = require('express');
const adminRouter = Router();
const { User, Course, Admin, Purchase } = require('../database/db');
const { z } = require("zod");
const jwt = require("jsonwebtoken");

require('dotenv').config();

app.use(expres.json());

async function generateHash(password) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash.toString();
}

adminRouter.post('/signup', async function (req, res) {
    try {
        const requiredResponse = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string().min(5).max(50),
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
            }, process.env.JWT_SECRET)

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
    }
})

adminRouter.post('/signin', function (req, res) {


    res.json({
        message: "You purchaesd courses"
    })
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