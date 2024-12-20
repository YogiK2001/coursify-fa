const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authUser(req, res, next) {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "Invalid token"
            });
        }
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({
            message: "Authentication failed"
        });
    }
}

module.exports = {
    authUser: authUser,
};