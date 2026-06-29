import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      required: true,
      enum: ['Income', 'Expense'] // এটি হয় আয় হবে, না হয় ব্যয় হবে
    },
    amount: { 
      type: Number, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    wallet: {
      type: String,
      default: 'Cash'
    },
    note: { 
      type: String 
    },
  },
  { timestamps: true } // কখন যোগ করা হলো তার সময় ধরে রাখবে
);

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;