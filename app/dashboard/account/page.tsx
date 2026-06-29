import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Wallet, Landmark, Smartphone } from "lucide-react";

export default function AccountPage() {
  return (
    
    <div className="space-y-6 max-w-4xl">
      {/* Total Card */}
      <Card className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 rounded-2xl border-0 shadow-lg text-center">
         <p className="text-sm opacity-90 mb-1">Total across all wallets</p>
         <h2 className="text-3xl font-bold">০.০০</h2>
      </Card>

      {/* Wallets List */}
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-gray-800">Wallets (3)</h3>
          <span className="text-red-600 text-sm font-semibold cursor-pointer hover:underline">+ Add</span>
        </div>

        <div className="space-y-3">
          {/* Cash Wallet */}
          <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl"><Wallet size={20} className="text-gray-600" /></div>
              <div>
                <p className="font-bold text-gray-800">Cash</p>
                <p className="text-xs text-gray-500">Cash</p>
              </div>
            </div>
            <div className="flex gap-3 text-red-600">
              <Pencil size={18} className="cursor-pointer" />
              <Trash2 size={18} className="cursor-pointer" />
            </div>
          </Card>

          {/* Bank Wallet */}
          <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-xl"><Landmark size={20} className="text-red-600" /></div>
              <div>
                <p className="font-bold text-gray-800">Bank Account</p>
                <p className="text-xs text-gray-500">Bank</p>
              </div>
            </div>
            <div className="flex gap-3 text-red-600">
              <Pencil size={18} className="cursor-pointer" />
              <Trash2 size={18} className="cursor-pointer" />
            </div>
          </Card>

          {/* Bkash Wallet */}
          <Card className="p-4 rounded-xl border-gray-100 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-xl"><Smartphone size={20} className="text-red-600" /></div>
              <div>
                <p className="font-bold text-gray-800">Bkash</p>
                <p className="text-xs text-gray-500">Mobile</p>
              </div>
            </div>
            <div className="flex gap-3 text-red-600">
              <Pencil size={18} className="cursor-pointer" />
              <Trash2 size={18} className="cursor-pointer" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
