"use client";

import { useEffect, useState } from "react";
import { 
  ArrowDownRight, ArrowUpRight, Eye, EyeOff, Sun, Moon, 
  Wallet, Landmark, Smartphone, HandCoins, ArrowRightLeft, CreditCard 
} from "lucide-react";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  
  // নতুন স্টেটগুলো
  const [isDarkMode, setIsDarkMode] = useState(true); // ডিফল্ট ডার্ক থিম
  const [showBalance, setShowBalance] = useState(true); // ব্যালেন্স দেখার আইকন
  const [greeting, setGreeting] = useState("");
  const username = "Guest"; // ভবিষ্যতে লগইন সিস্টেম করলে এখানে আসল নাম আসবে

  // গ্রিটিংস লজিক (সময় অনুযায়ী)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("শুভ সকাল");
    else if (hour >= 12 && hour < 16) setGreeting("শুভ দুপুর");
    else if (hour >= 16 && hour < 18) setGreeting("শুভ অপরাহ্ন");
    else if (hour >= 18 && hour < 20) setGreeting("শুভ সন্ধ্যা");
    else setGreeting("শুভ রাত্রি");
  }, []);

  // ডেটাবেস থেকে ডেটা টানা
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaction");
        const result = await res.json();
        
        if (result.success) {
          const data = result.data;
          setTransactions(data);

          let income = 0;
          let expense = 0;
          
          data.forEach((t: any) => {
            if (t.type === "Income") income += t.amount;
            if (t.type === "Expense") expense += t.amount;
          });

          setTotals({ income, expense, balance: income - expense });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    // থিম কন্ট্রোল করার জন্য মেইন র‍্যাপার (Wrapper)
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-500 rounded-3xl p-4 lg:p-8">
        
        {/* টপ হেডার: গ্রিটিংস এবং থিম টগল */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-500">
              {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                হ্যালো, {username}!
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">
                {greeting}
              </p>
            </div>
          </div>
          
          {/* থিম চেঞ্জ বাটন */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 shadow-sm hover:scale-105 transition-all text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* বাম দিকের অংশ (ব্যালেন্স কার্ড এবং লেনদেন) */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* ব্যালেন্স কার্ড (Red Gradient) */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-900 rounded-[2rem] p-8 text-white shadow-xl shadow-red-900/20 transition-all duration-300 hover:shadow-red-900/40">
              <div className="flex justify-between items-start mb-6">
                <p className="text-red-100 font-medium opacity-90">মোট ব্যালেন্স</p>
                <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all">
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              
              <h2 className="text-5xl font-bold mb-10 tracking-tight">
                {showBalance ? `৳ ${totals.balance.toLocaleString()}` : "৳ ••••••••"}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full"><ArrowDownRight size={20} /></div>
                  <div>
                    <p className="text-xs text-red-100 opacity-80">মোট আয়</p>
                    <p className="font-semibold text-lg">{showBalance ? `৳ ${totals.income}` : "••••"}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full"><ArrowUpRight size={20} /></div>
                  <div>
                    <p className="text-xs text-red-100 opacity-80">মোট ব্যয়</p>
                    <p className="font-semibold text-lg">{showBalance ? `৳ ${totals.expense}` : "••••"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* সাম্প্রতিক লেনদেন */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors">সাম্প্রতিক লেনদেন</h3>
                <button className="text-sm text-red-500 hover:text-red-600 font-medium">সব দেখুন &gt;</button>
              </div>
              
              <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-4 border border-gray-100 dark:border-gray-800/50 shadow-sm transition-colors">
                {transactions.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-[#242424] p-4 rounded-full mb-3 text-gray-400">
                      <Wallet size={32} />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">কোনো লেনদেন নেই</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">নতুন লেনদেন যোগ করতে + বাটনে ক্লিক করুন</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {transactions.slice(0, 5).map((t: any) => (
                      <div key={t._id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#242424] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-2xl transition-all cursor-pointer border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${t.type === 'Income' ? 'bg-green-100/50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100/50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                            {t.type === 'Income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{t.category}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className={`font-bold ${t.type === 'Income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {t.type === 'Income' ? '+' : '-'} ৳ {t.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ডান দিকের অংশ (অ্যাকাউন্ট এবং ঋণ হিসাব) */}
          <div className="space-y-8">
            
            {/* অ্যাকাউন্ট সেকশন */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors">অ্যাকাউন্ট</h3>
                <button className="text-sm text-red-500 hover:text-red-600 font-medium">সব দেখুন &gt;</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-500/50 transition-all cursor-pointer shadow-sm">
                  <Wallet size={20} className="text-blue-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">নগদ</p>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-500/50 transition-all cursor-pointer shadow-sm">
                  <Landmark size={20} className="text-indigo-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">ব্যাংক</p>
                </div>
                <div className="col-span-2 bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-500/50 transition-all cursor-pointer shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-pink-500" />
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">মোবাইল ব্যাংকিং</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ঋণ হিসাব সেকশন */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors">ঋণ হিসাব</h3>
                <button className="text-sm text-red-500 hover:text-red-600 font-medium">সব দেখুন &gt;</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#242424] transition-all cursor-pointer shadow-sm">
                  <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500"><ArrowDownRight size={16} /></div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">পাওনা</p>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#242424] transition-all cursor-pointer shadow-sm">
                  <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500"><ArrowUpRight size={16} /></div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">দেনা</p>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#242424] transition-all cursor-pointer shadow-sm">
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500"><Landmark size={16} /></div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">লোন</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}