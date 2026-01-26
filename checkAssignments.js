
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Assignment from './models/Assignment.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");
        const assignments = await Assignment.find({});
        console.log("Assignments found:", assignments.length);
        assignments.forEach(a => {
            console.log(`ID: ${a._id}, Title: ${a.title}, FilePath: '${a.filePath}' (${typeof a.filePath})`);
        });
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
