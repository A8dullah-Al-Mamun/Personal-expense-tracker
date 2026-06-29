import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Budget from '@/models/Budget';

// POST রিকোয়েস্ট (ডেটাবেসে নতুন বাজেট সেভ করার জন্য)
export async function POST(request: Request) {
  try {
    // ১. ডেটাবেসের সাথে কানেক্ট করা
    await connectToDB();

    // ২. ফ্রন্টএন্ড থেকে পাঠানো ডেটা রিসিভ করা
    const data = await request.json();

    // ৩. ডেটাবেসে সেভ করা
    const newBudget = await Budget.create(data);

    // ৪. সফল হলে মেসেজ পাঠানো
    return NextResponse.json({ success: true, message: 'বাজেট সফলভাবে সেভ হয়েছে!', data: newBudget }, { status: 201 });
  } catch (error) {
    console.error("Budget Save Error:", error);
    return NextResponse.json({ success: false, message: 'বাজেট সেভ করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}

// GET রিকোয়েস্ট (ডেটাবেস থেকে সব বাজেট দেখার জন্য)
export async function GET() {
  try {
    await connectToDB();
    const budgets = await Budget.find({}).sort({ createdAt: -1 }); // নতুনগুলো আগে দেখাবে
    return NextResponse.json({ success: true, data: budgets });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'ডেটা লোড করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}