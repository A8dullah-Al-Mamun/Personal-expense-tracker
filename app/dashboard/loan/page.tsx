import { Button } from "@/components/ui/button";

export default function LoanPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">ঋণ হিসাব</h2>
        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">+ Add</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button className="px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600">All</button>
        <button className="px-4 py-1.5 rounded-full bg-red-600 text-white text-sm shadow-md">পাওনা</button>
        <button className="px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600">দেনা</button>
        <button className="px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600">লোন</button>
      </div>

      {/* Empty State */}
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p>No active loans</p>
      </div>
    </div>
  );
}