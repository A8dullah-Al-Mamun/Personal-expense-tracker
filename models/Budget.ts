import mongoose from 'mongoose';

// বাজেটের ডেটা কেমন হবে তার ছাঁচ
const budgetSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      required: true,
      default: 'Overall' // কিছু সিলেক্ট না করলে Overall হিসেবে সেভ হবে
    },
    amount: { 
      type: Number, 
      required: true 
    },
    month: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true } // এটি স্বয়ংক্রিয়ভাবে সেভ করার সময় ও তারিখ লিখে রাখবে
);

// Next.js-এ হট-রিলোডের সময় যেন বারবার মডেল তৈরি না হয়, তাই এই লজিক
const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;