const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authAdmin(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not signed up sir!!!"
        })
    }
}

module.exports = {
    authAdmin: authAdmin,
}