const { Router } = require('express');
const courseRouter = Router();



courseRouter.post('/purchases', function (req, res) {
    res.json({
        message: "You purchaesd courses"
    })
})


courseRouter.post('/purchase', function (req, res) {
    res.json({
        message: "You bought this course"
    })
})

module.exports = {
    courseRouter: courseRouter
}