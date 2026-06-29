"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Utensils, Car, ShoppingBag, ReceiptText, HeartPulse, GraduationCap, Gamepad2, UtensilsCrossed, Users, ShoppingCart, Wifi, Smartphone, Package } from "lucide-react";

// ক্যাটাগরির লিস্ট এবং আইকনগুলো বাইরে রাখলাম যাতে সব জায়গা থেকে ব্যবহার করা যায়
const categories = [
  { id: 1, name: "Overall", icon: Wallet },
  { id: 2, name: "Food", icon: Utensils },
  { id: 3, name: "Transport", icon: Car },
  { id: 4, name: "Shopping", icon: ShoppingBag },
  { id: 5, name: "Bills", icon: ReceiptText },
  { id: 6, name: "Health", icon: HeartPulse },
  { id: 7, name: "Education", icon: GraduationCap },
  { id: 8, name: "Entertainment", icon: Gamepad2 },
  { id: 9, name: "Restaurant", icon: UtensilsCrossed },
  { id: 10, name: "Family", icon: Users },
  { id: 11, name: "Groceries/daily", icon: ShoppingCart },
  { id: 12, name: "Wifi Bill", icon: Wifi },
  { id: 13, name: "Mobile bill", icon: Smartphone },
  { id: 14, name: "Other", icon: Package },
];

export default function BudgetPage() {
  const [selectedCategory, setSelectedCategory] = useState("Overall");
  const [amount, setAmount] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // ডেটাবেস থেকে আসা বাজেটগুলো রাখার জন্য নতুন State
  const [savedBudgets, setSavedBudgets] = useState<any[]>([]);

  // ডেটাবেস থেকে ডেটা টেনে আনার ফাংশন (GET Request)
  const fetchBudgets = async () => {
    try {
      const response = await fetch("/api/budget");
      const result = await response.json();
      if (result.success) {
        setSavedBudgets(result.data); // ডেটাবেসের ডেটা state এ সেভ করলাম
      }
    } catch (error) {
      console.error("ডেটা লোড করতে সমস্যা হয়েছে", error);
    }
  };

  // পেজ লোড হওয়ার সাথে সাথে একবার ডেটা টেনে আনবে
  useEffect(() => {
    fetchBudgets();
  }, []);

  // ডেটাবেসে নতুন বাজেট সেভ করার ফাংশন
  const handleSaveBudget = async () => {
    if (!amount) {
      alert("দয়া করে টাকার পরিমাণ লিখুন!");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          amount: Number(amount),
          month: "June 2026", 
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("🎉 বাজেট সফলভাবে সেভ হয়েছে!");
        setAmount(""); 
        setSelectedCategory("Overall"); 
        setIsOpen(false); 
        
        // নতুন ডেটা সেভ হওয়ার পর আবার আপডেট হওয়া লিস্টটা টেনে আনবো
        fetchBudgets();
      } else {
        alert("❌ সমস্যা হয়েছে: " + result.message);
      }
    } catch (error) {
      alert("সার্ভারে কোনো সমস্যা হয়েছে!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Budgets</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold">
              + Add Budget
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6 border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-2">Set Budget</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500 mb-3">Category (leave empty for overall)</p>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedCategory === cat.name ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 bg-gray-50 hover:border-red-200 text-gray-600'
                      }`}
                    >
                      <cat.icon size={20} className="mb-1" />
                      <span className="text-[10px] font-medium text-center">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Budget Amount</p>
                <Input 
                  type="number"
                  placeholder="0" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-100 border-0 rounded-xl py-6 text-lg px-4 focus-visible:ring-red-600" 
                />
              </div>

              <Button 
                onClick={handleSaveBudget} 
                disabled={isSaving}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6 text-md font-bold"
              >
                {isSaving ? "Saving..." : "Set Budget"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="text-gray-400 mt-2">
         <p className="font-medium text-sm mb-6">June 2026</p>
      </div>

      {/* ডেটাবেস থেকে আসা ডেটাগুলো দেখানোর ডিজাইন */}
      <div className="space-y-4">
        {savedBudgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
             <p className="text-gray-500 font-medium">এখনও কোনো বাজেট সেট করা হয়নি</p>
             <p className="text-xs text-gray-400 mt-1">+ বাটনে ক্লিক করে বাজেট যোগ করুন</p>
          </div>
        ) : (
          savedBudgets.map((budget) => {
            // ক্যাটাগরির সাথে আইকন মেলানোর লজিক
            const catInfo = categories.find(c => c.name === budget.category);
            const Icon = catInfo ? catInfo.icon : Package;

            return (
              <div key={budget._id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="bg-red-50 p-3 rounded-xl text-red-600">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{budget.category}</p>
                    <p className="text-xs text-gray-500">{budget.month}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-gray-800">৳ {budget.amount}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}