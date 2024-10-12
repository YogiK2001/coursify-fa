const express = require('express');

const app = express();
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');


app.use('/user', userRouter);
app.use('/courses', courseRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
