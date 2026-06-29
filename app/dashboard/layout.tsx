"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Wallet, BarChart3, List, Landmark, 
  Search, PieChart, Tags, Settings, LogOut
} from "lucide-react";
import AddTransactionModal from "@/components/AddTransactionModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // মেনু আইটেমগুলোর লিস্ট
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
    <div className="flex h-screen bg-[#121212] overflow-hidden font-sans"> 
      
      {/* ---------------- সাইডবার (Sidebar) ---------------- */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800/50 flex flex-col justify-between hidden md:flex">
        <div>
          {/* লোগো সেকশন */}
          <div className="p-6 flex items-center gap-3">
            <div className="bg-red-600 text-white p-2 rounded-xl font-bold text-xl leading-none shadow-lg shadow-red-900/20">
              P
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">PaysaPro</h1>
          </div>

          {/* মেনু বা নেভিগেশন */}
          <nav className="px-4 space-y-1.5 mt-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-red-900/40 to-transparent border-l-4 border-red-600 text-red-500 font-semibold" 
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ইউজার প্রোফাইল (একদম নিচে) */}
        <div className="p-4 border-t border-gray-800/50 mb-2">
          <div className="flex justify-between items-center px-4 py-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 font-bold border border-red-900/50">
                G
              </div>
              <div>
                <p className="text-sm font-bold text-white">Guest</p>
                <p className="text-[10px] text-gray-500">Guest Mode</p>
              </div>
            </div>
            <LogOut size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* ---------------- মেইন কন্টেন্ট এরিয়া ---------------- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* টপ হেডার (Header) */}
        <header className="flex justify-end lg:justify-between items-center p-6 border-b border-gray-800/50 bg-[#1a1a1a]/50 backdrop-blur-md sticky top-0 z-10">
           <div className="hidden lg:block text-gray-500 text-sm cursor-pointer hover:text-gray-300 transition-colors">
             &lt; ড্যাশবোর্ড ওভারভিউ
           </div> 
           
           <div className="flex items-center gap-4">
             {/* ট্রানজেকশন অ্যাড করার মডাল */}
             <AddTransactionModal>
               <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2.5 font-medium transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 active:scale-95">
                 <span className="text-xl leading-none pb-0.5">+</span> নতুন যোগ করুন
               </button>
             </AddTransactionModal>
           </div>
        </header>

        {/* পেজের আসল কন্টেন্ট (যেখানে page.tsx লোড হবে) */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}