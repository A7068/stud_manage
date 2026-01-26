import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import User from './models/User.js';

const run = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI not defined in .env");
    }

    await mongoose.connect(mongoUri);

    const email = 'admin@example.com';

    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const hashed = await hash('Admin@1234', 10);

    const admin = new User({
      name: 'Admin',
      email: email,
      password: hashed,
      role: 'admin',
      joiningDate: new Date()
    });

    await admin.save();
    console.log('\n✔ Admin created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: Admin@1234\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

run();
