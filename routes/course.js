const express = require('express');
const app = express();
const { Router, application } = require('express');
const courseRouter = Router();
const { User, Course, Admin, Purchase } = require('../database/db');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { authUser } = require("../middleware/user");
const course = require('./course');



app.use(express.json());



courseRouter.post('/purchases', authUser, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await Purchase.create({
        userId,
        courseId,
    })

    res.json({
        message: "You are scussefully bought the course"
    })

})


courseRouter.get('/preview', async function (req, res) {
    try {
        const courses = await Course.find({}).lean();

        res.json({
            courses
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = {
    courseRouter: courseRouter
}