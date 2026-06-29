import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

// POST: নতুন আয় বা ব্যয় সেভ করার জন্য
export async function POST(request: Request) {
  try {
    await connectToDB();
    const data = await request.json();
    const newTransaction = await Transaction.create(data);
    
    return NextResponse.json({ success: true, message: 'লেনদেন সেভ হয়েছে!', data: newTransaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'সেভ করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}

// GET: সব আয়-ব্যয়ের হিসাব দেখার জন্য
export async function GET() {
  try {
    await connectToDB();
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'ডেটা লোড করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}