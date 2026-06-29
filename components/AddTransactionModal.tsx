"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddTransactionModal({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState("Expense"); // ডিফল্ট ব্যয়
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount: Number(amount), category, note }),
    });

    if (res.ok) {
      alert("সফলভাবে যোগ করা হয়েছে!");
      setIsOpen(false);
      window.location.reload(); // পেজ রিলোড দিয়ে নতুন ডেটা দেখাবে
    } else {
      alert("সমস্যা হয়েছে!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white rounded-3xl">
        <DialogHeader><DialogTitle>নতুন লেনদেন যোগ করুন</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Button onClick={() => setType("Income")} className={type === "Income" ? "bg-green-600" : "bg-gray-200"}>আয়</Button>
            <Button onClick={() => setType("Expense")} className={type === "Expense" ? "bg-red-600" : "bg-gray-200"}>ব্যয়</Button>
          </div>
          <Input type="number" placeholder="পরিমাণ (টাকা)" onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder="ক্যাটাগরি" onChange={(e) => setCategory(e.target.value)} />
          <Input placeholder="নোট (অপশনাল)" onChange={(e) => setNote(e.target.value)} />
          <Button onClick={handleSubmit} className="w-full bg-black text-white">সেভ করুন</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}