const { Router } = require('express');
const courseRouter = Router();



courseRouter.post('/course/purchases', function (req, res) {
    res.json({
        message: "You purchaesd courses"
    })
})


courseRouter.post('/course/purchase', function (req, res) {
    res.json({
        message: "You bought this course"
    })
})

module.exports = {
    courseRouter: courseRouter
}