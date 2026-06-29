"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react";

export default function ListPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transaction");
    const result = await res.json();
    if (result.success) setTransactions(result.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?")) return;
    
    const res = await fetch(`/api/transaction/${id}`, { method: "DELETE" });
    if (res.ok) fetchTransactions(); // ডিলিট হলে আবার নতুন করে ডেটা লোড করবে
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">সকল লেনদেন</h2>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-10">কোনো লেনদেন পাওয়া যায়নি।</p>
        ) : (
          transactions.map((t: any) => (
            <div key={t._id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${t.type === 'Income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {t.type === 'Income' ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{t.category}</p>
                  <p className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-bold text-xl ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Income' ? '+' : '-'} ৳ {t.amount}
                </p>
                <button onClick={() => handleDelete(t._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}