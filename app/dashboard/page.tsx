"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Wallet, History } from "lucide-react";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });

  // কাজ ১: ডেটাবেস থেকে ডেটা টেনে আনার ফাংশন
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaction");
        const result = await res.json();
        
        if (result.success) {
          const data = result.data;
          setTransactions(data);

          // কাজ ২, ৩ ও ৪: আয়, ব্যয় এবং ব্যালেন্স হিসাব করা
          let income = 0;
          let expense = 0;
          
          data.forEach((t: any) => {
            if (t.type === "Income") income += t.amount;
            if (t.type === "Expense") expense += t.amount;
          });

          setTotals({
            income,
            expense,
            balance: income - expense
          });
        }
      } catch (error) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
      }
    };

    fetchTransactions();
  }, []); // পেজ লোড হলে একবার চলবে

  return (
    <div className="space-y-6">
      {/* ব্যালেন্স, আয় ও ব্যয়ের কার্ডগুলো */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ব্যালেন্স কার্ড */}
        <Card className="p-6 bg-gray-900 text-white rounded-3xl border-0 shadow-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Wallet size={18} />
            <p className="font-medium">মোট ব্যালেন্স</p>
          </div>
          <h2 className="text-4xl font-bold">৳ {totals.balance}</h2>
        </Card>

        {/* আয় কার্ড */}
        <Card className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <div className="bg-green-100 p-1.5 rounded-full text-green-600">
              <ArrowDownRight size={16} />
            </div>
            <p className="font-medium">মোট আয়</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">৳ {totals.income}</h2>
        </Card>

        {/* ব্যয় কার্ড */}
        <Card className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <div className="bg-red-100 p-1.5 rounded-full text-red-600">
              <ArrowUpRight size={16} />
            </div>
            <p className="font-medium">মোট ব্যয়</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">৳ {totals.expense}</h2>
        </Card>
      </div>

      {/* সাম্প্রতিক লেনদেনের তালিকা */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <History size={20} className="text-gray-600" />
          <h3 className="text-xl font-bold text-gray-800">সাম্প্রতিক লেনদেন</h3>
        </div>

        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-500 border border-dashed border-gray-300">
              এখনও কোনো লেনদেন করা হয়নি। নতুন যোগ করুন!
            </div>
          ) : (
            transactions.slice(0, 10).map((t: any) => (
              <div key={t._id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${t.type === 'Income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {t.type === 'Income' ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{t.category}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(t.createdAt).toLocaleDateString()} {/* ডেটাবেস থেকে আসা আসল তারিখ */}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-xl ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'Income' ? '+' : '-'} ৳ {t.amount}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}