"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function ReportPage() {
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/transaction");
      const result = await res.json();
      
      if (result.success) {
        let total = 0;
        const expenseMap: Record<string, number> = {};

        // শুধুমাত্র খরচের (Expense) হিসাব বের করা
        result.data.forEach((t: any) => {
          if (t.type === "Expense") {
            total += t.amount;
            expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
          }
        });

        setTotalExpense(total);
        
        // ডেটাগুলোকে অ্যারে তে কনভার্ট করা
        const formattedExpenses = Object.keys(expenseMap).map(key => ({
          category: key,
          amount: expenseMap[key]
        }));
        setExpenses(formattedExpenses);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800">খরচের রিপোর্ট</h2>

      <Card className="p-6 bg-red-50 border-0 shadow-sm mb-6">
        <p className="text-gray-500 font-medium">সর্বমোট খরচ</p>
        <h2 className="text-4xl font-bold text-red-600">৳ {totalExpense}</h2>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-700">ক্যাটাগরি অনুযায়ী খরচ:</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500">কোনো খরচের ডেটা নেই।</p>
        ) : (
          expenses.map((exp, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-800">{exp.category}</p>
                <p className="font-bold text-gray-600">৳ {exp.amount}</p>
              </div>
              {/* প্রোগ্রেস বার (Progress Bar) */}
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${(exp.amount / totalExpense) * 100}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}