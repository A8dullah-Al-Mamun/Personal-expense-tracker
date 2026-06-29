import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('দয়া করে .env.local ফাইলে MONGODB_URI যুক্ত করুন');
}

// কানেকশন স্ট্যাটাস মনে রাখার জন্য
let isConnected = false; 

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('✅ MongoDB আগে থেকেই কানেক্টেড আছে');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('🚀 MongoDB সফলভাবে কানেক্ট হয়েছে!');
  } catch (error) {
    console.log('❌ MongoDB কানেকশনে এরর:', error);
  }
};