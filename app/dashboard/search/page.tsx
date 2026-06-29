import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">অনুসন্ধান</h2>

      <div className="relative">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        <Input 
          placeholder="ক্যাটাগরি, নোট বা পরিমাণ লিখুন..." 
          className="pl-10 py-6 rounded-xl border-gray-300 bg-white" 
        />
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center mt-32 text-gray-400">
        <Search size={48} className="text-gray-300 mb-4" />
        <p className="font-medium text-gray-500">লেনদেন খুঁজতে কিছু লিখুন</p>
      </div>
    </div>
  );
}