const mongoose = require('mongoose');
console.log("======Connected to MongoDB");
mongoose.connect('mongodb+srv://learning12102001:8BvLtVD5joqNfQI6@cluster0.hsmhh.mongodb.net/coursify-app');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // Use Types.ObjectId

// User Schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

// Course Schema
const courseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'user', required: true }, // Reference to User
});

// Admin Schema
const adminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
});

// Purchase Schema
const purchaseSchema = new Schema({
    courseId: { type: ObjectId, ref: 'course', required: true }, // Reference to Course
    userId: { type: ObjectId, ref: 'user', required: true },     // Reference to User
    purchasedAt: { type: Date, default: Date.now },               // Optional timestamp
});

// Models
const User = mongoose.model('user', userSchema);
const Course = mongoose.model('course', courseSchema);
const Admin = mongoose.model('admin', adminSchema);
const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = { User, Course, Admin, Purchase };