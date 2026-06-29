import AddTransactionModal from "@/components/AddTransactionModal";
import Link from "next/link";
import { Home, Wallet, FileText, List, CreditCard, Search, PieChart, Tags, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="bg-red-900 p-2 rounded-lg text-white">
                            <span className="font-bold text-xl">P</span>
                        </div>
                        <h1 className="text-xl font-bold text-red-900">RAIHAN BOSS WELCOME</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="px-4 space-y-1 mt-4">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <Home size={20} /> হোম
                        </Link>
                        <Link href="/dashboard/account" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <Wallet size={20} /> অ্যাকাউন্ট
                        </Link>
                        <Link href="/dashboard/report" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <FileText size={20} /> রিপোর্ট
                        </Link>
                        <Link href="/dashboard/list" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <List size={20} /> তালিকা
                        </Link>
                        <Link href="/dashboard/loan" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <CreditCard size={20} /> ঋণ হিসাব
                        </Link>
                        <Link href="/dashboard/search" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <Search size={20} /> অনুসন্ধান
                        </Link>
                        <Link href="/dashboard/budget" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <PieChart size={20} /> বাজেট
                        </Link>
                        <Link href="/dashboard/category" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <Tags size={20} /> ক্যাটাগরি
                        </Link>
                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                            <Settings size={20} /> সেটিংস
                        </Link>
                    </nav>
                </div>

                {/* User Profile / Logout */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-900 text-white flex items-center justify-center font-bold">
                                G
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Guest</p>
                                <p className="text-xs text-gray-500">Guest Mode</p>
                            </div>
                        </div>
                        <LogOut size={18} className="text-red-500" />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Topbar */}
                <header className="flex justify-between items-center p-6 bg-white md:bg-transparent">
                    <div></div> {/* Empty div for flex spacing */}
                    <div className="flex gap-4 items-center">

                        <AddTransactionModal>
                            <Button className="bg-[#722020] hover:bg-[#5a1919] text-white rounded-full px-6 flex gap-2">
                                <span>+</span> নতুন যোগ করুন
                            </Button>
                        </AddTransactionModal>

                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-900 font-bold border border-red-200">
                            G
                        </div>
                    </div>
                </header>

                {/* Page Content goes here */}
                <div className="px-6 pb-6">
                    {children}
                </div>
            </main>
        </div>
    );
}