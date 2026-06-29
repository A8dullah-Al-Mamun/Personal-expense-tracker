import { Card } from "@/components/ui/card";
import { User, Moon, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800">সেটিংস</h2>

      <div className="space-y-4">
        <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50">
          <div className="bg-red-50 p-3 rounded-full"><User className="text-red-600" size={20} /></div>
          <div>
            <p className="font-bold text-gray-800">প্রোফাইল আপডেট</p>
            <p className="text-xs text-gray-500">নাম, ইমেইল এবং পাসওয়ার্ড পরিবর্তন করুন</p>
          </div>
        </Card>

        <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50">
          <div className="bg-gray-100 p-3 rounded-full"><Globe className="text-gray-600" size={20} /></div>
          <div>
            <p className="font-bold text-gray-800">কারেন্সি (Currency)</p>
            <p className="text-xs text-gray-500">টাকা (৳) বা ডলার ($) সিলেক্ট করুন</p>
          </div>
        </Card>

        <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full"><Moon className="text-gray-600" size={20} /></div>
            <div>
              <p className="font-bold text-gray-800">ডার্ক মোড</p>
              <p className="text-xs text-gray-500">চোখের শান্তির জন্য ডার্ক থিম ব্যবহার করুন</p>
            </div>
          </div>
          {/* Toggle Switch Demo */}
          <div className="w-10 h-5 bg-gray-200 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-0.5 shadow-sm"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}