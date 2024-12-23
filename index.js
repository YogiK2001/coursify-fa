const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
require('dotenv').config();

app.use(cors());

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');


app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/courses', courseRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
