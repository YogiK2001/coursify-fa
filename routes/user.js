const { Router } = require('express');
const userRouter = Router();

userRouter.post('/signup', function (req, res) {
    res.json({ message: "Singup Endpoint" })
})

userRouter.post('/signin', function (req, res) {
    res.json({ message: "Singup Endpoint" })
})



userRouter.get('/purchases', function (req, res) {
    res.json({ message: "Singup Endpoint" })
})

module.exports = {
    userRouter: userRouter
}