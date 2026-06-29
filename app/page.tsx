import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, BarChart3, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Side - Dark Section (ডেস্কটপের জন্য) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#1a1a1a] text-white p-10">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="bg-[#2a2a2a] p-4 rounded-2xl mb-6">
            <Wallet size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">PaysaPro</h1>
          <p className="text-gray-400 mb-12">আপনার আর্থিক ব্যবস্থাপনার সেরা সমাধান</p>

          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Feature 1 */}
            <div className="bg-[#2a2a2a]/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <Wallet className="mb-2 text-gray-400" />
              <h3 className="font-semibold text-sm">মাল্টি ওয়ালেট</h3>
              <p className="text-xs text-gray-500">ক্যাশ, ব্যাংক, মোবাইল</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-[#2a2a2a]/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <TrendingUp className="mb-2 text-gray-400" />
              <h3 className="font-semibold text-sm">আয়-ব্যয় ট্র্যাকিং</h3>
              <p className="text-xs text-gray-500">রিয়েল-টাইম হিসাব</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-[#2a2a2a]/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <BarChart3 className="mb-2 text-gray-400" />
              <h3 className="font-semibold text-sm">রিপোর্ট ও চার্ট</h3>
              <p className="text-xs text-gray-500">বিস্তারিত বিশ্লেষণ</p>
            </div>
            {/* Feature 4 */}
            <div className="bg-[#2a2a2a]/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center">
              <ShieldCheck className="mb-2 text-gray-400" />
              <h3 className="font-semibold text-sm">নিরাপদ ক্লাউড</h3>
              <p className="text-xs text-gray-500">সব ডিভাইসে সিঙ্ক</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (লগিন ফর্ম) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50 p-6">
        <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl bg-white">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center gap-2 mb-6 bg-gray-100 p-1 rounded-full w-max mx-auto">
              <Button variant="default" className="rounded-full px-8 bg-red-600 hover:bg-red-700 text-white">সাইন ইন</Button>
              <Button variant="ghost" className="rounded-full px-8 text-gray-500 hover:text-black">সাইন আপ</Button>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">ফিরে আসার জন্য স্বাগতম!</CardTitle>
            <CardDescription className="text-gray-500">আপনার অ্যাকাউন্টে সাইন ইন করুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input id="email" placeholder="ইমেইল অ্যাড্রেস" className="pl-11 py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-red-600" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input id="password" type="password" placeholder="পাসওয়ার্ড" className="pl-11 py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-red-600" />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6 text-md font-semibold">
              সাইন ইন করুন →
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-400">অথবা</span>
              </div>
            </div>

            <Button variant="outline" className="w-full py-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 font-medium flex gap-2">
              Google দিয়ে সাইন ইন
            </Button>
            <Link href="/dashboard" className="w-full block">
              <Button
                variant="secondary"
                className="w-full py-6 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium"
              >
                গেস্ট মোডে চালিয়ে যান
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}