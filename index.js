const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
require('dotenv').config();
const path = require('path');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');



app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/courses', courseRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
