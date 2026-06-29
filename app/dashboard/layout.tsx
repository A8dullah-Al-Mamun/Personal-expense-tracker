"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Wallet, BarChart3, List, Landmark, 
  Search, PieChart, Tags, Settings, LogOut, Sun, Moon
} from "lucide-react";
import AddTransactionModal from "@/components/AddTransactionModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // গ্লোবাল ডার্ক মোড স্টেট (ডিফল্ট ডার্ক)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // পুরো ওয়েবসাইটের HTML-এ ডার্ক মোড অ্যাপ্লাই করা
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { name: "হোম", href: "/dashboard", icon: <Home size={20} /> },
    { name: "অ্যাকাউন্ট", href: "/dashboard/account", icon: <Wallet size={20} /> },
    { name: "রিপোর্ট", href: "/dashboard/report", icon: <BarChart3 size={20} /> },
    { name: "তালিকা", href: "/dashboard/list", icon: <List size={20} /> },
    { name: "ঋণ হিসাব", href: "/dashboard/loan", icon: <Landmark size={20} /> },
    { name: "অনুসন্ধান", href: "/dashboard/search", icon: <Search size={20} /> },
    { name: "বাজেট", href: "/dashboard/budget", icon: <PieChart size={20} /> },
    { name: "ক্যাটাগরি", href: "/dashboard/category", icon: <Tags size={20} /> },
    { name: "সেটিংস", href: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-500 overflow-hidden font-sans"> 
      
      {/* ---------------- সাইডবার (Sidebar) ---------------- */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800/50 flex flex-col justify-between hidden md:flex transition-colors duration-500">
        <div>
          {/* লোগো সেকশন */}
          <div className="p-6 flex items-center gap-3">
            <div className="bg-red-600 text-white p-2 rounded-xl font-bold text-xl leading-none shadow-lg shadow-red-900/20">
              P
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide transition-colors">PaysaPro</h1>
          </div>

          {/* মেনু বা নেভিগেশন */}
          <nav className="px-4 space-y-1.5 mt-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? "bg-red-50 text-red-600 border-l-4 border-red-600 font-semibold dark:bg-gradient-to-r dark:from-red-900/40 dark:to-transparent dark:text-red-500" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ইউজার প্রোফাইল */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800/50 mb-2 transition-colors">
          <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500 font-bold border border-red-200 dark:border-red-900/50">
                G
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">Guest</p>
                <p className="text-[10px] text-gray-500">Guest Mode</p>
              </div>
            </div>
            <LogOut size={18} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* ---------------- মেইন কন্টেন্ট এরিয়া ---------------- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* টপ হেডার (Header) */}
        <header className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800/50 bg-white/80 dark:bg-[#1a1a1a]/50 backdrop-blur-md sticky top-0 z-10 transition-colors duration-500">
           
           <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
             ড্যাশবোর্ড ওভারভিউ
           </div> 
           
           <div className="flex items-center gap-4">
             {/* গ্লোবাল থিম চেঞ্জ বাটন */}
             <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 transition-all text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             {/* ট্রানজেকশন অ্যাড করার মডাল */}
             <AddTransactionModal>
               <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2.5 font-medium transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 active:scale-95">
                 <span className="text-xl leading-none pb-0.5">+</span> নতুন যোগ করুন
               </button>
             </AddTransactionModal>
           </div>
        </header>

        {/* পেজের আসল কন্টেন্ট */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}