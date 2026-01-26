
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notes from './models/Notes.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");
        const notes = await Notes.find({});
        console.log("Notes found:", notes.length);
        notes.forEach(n => {
            console.log(`ID: ${n._id}, Title: ${n.title}, FilePath: '${n.filePath}' (${typeof n.filePath})`);
        });
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
