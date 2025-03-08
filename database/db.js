require('dotenv').config()
const mongoose = require('mongoose');
console.log("======Connected to MongoDB======");
mongoose.connect(process.env.MONGODB_URI);

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
    myFile: String,
    creatorId: { type: ObjectId, ref: 'user', required: true }, // Reference to User
}, { strict: false });

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

const ContentSchema = new Schema({
    courseId: { type: ObjectId, ref: 'course', required: true }, // Reference to Course
    slides: [
        {
            title: String,
            text: String,
            videos: [Schema.Types.ObjectId],
            images: [Schema.Types.ObjectId],
            notes: String
        }
    ]
});

// Models
const User = mongoose.model('user', userSchema);
const Course = mongoose.model('course', courseSchema);
const Admin = mongoose.model('admin', adminSchema);
const Purchase = mongoose.model('purchase', purchaseSchema);
const Content = mongoose.model('content', ContentSchema);

module.exports = { User, Course, Admin, Purchase, Content };
