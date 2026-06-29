import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tags } from "lucide-react";

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">ক্যাটাগরি</h2>
        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">+ Add</Button>
      </div>

      <div className="bg-gray-100 p-1 rounded-xl flex max-w-xs">
        <button className="flex-1 bg-white py-2 rounded-lg text-sm font-bold shadow-sm">Expense</button>
        <button className="flex-1 py-2 text-sm text-gray-500 font-medium hover:text-gray-800">Income</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {/* ডেমো ক্যাটাগরি কার্ড */}
        {['Food', 'Transport', 'Shopping', 'Health'].map((cat, i) => (
          <Card key={i} className="p-4 rounded-xl border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-red-200 cursor-pointer">
            <Tags size={24} className="text-gray-400" />
            <p className="font-semibold text-gray-700">{cat}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}